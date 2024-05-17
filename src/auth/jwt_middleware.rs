use poem::http::header::AUTHORIZATION;
use poem::http::StatusCode;
use poem::{Endpoint, Error, Middleware, Request, Result};

use super::claims::Claims;

/// A middleware that extract token from HTTP headers. See https://docs.rs/poem/latest/poem/middleware/trait.Middleware.html
pub struct JwtMiddleware;

impl<E: Endpoint> Middleware<E> for JwtMiddleware {
    type Output = JwtMiddlewareImpl<E>;

    fn transform(&self, ep: E) -> Self::Output {
        JwtMiddlewareImpl { ep }
    }
}

/// The new endpoint type generated by the TokenMiddleware.
pub struct JwtMiddlewareImpl<E> {
    ep: E,
}

impl<E: Endpoint> Endpoint for JwtMiddlewareImpl<E> {
    type Output = E::Output;

    async fn call(&self, mut req: Request) -> Result<Self::Output> {
        let token = match req.headers().get(AUTHORIZATION) {
            Some(header) => header.to_str().ok(),
            None => {
                return Err(Error::from_string(
                    "Missing Authorization header",
                    StatusCode::UNAUTHORIZED,
                ))
            }
        }
        .unwrap()
        .split(' ')
        .nth(1);

        let token = match token {
            Some(token) => token,
            None => {
                return Err(Error::from_string(
                    "Invalid Authorization header",
                    StatusCode::UNAUTHORIZED,
                ))
            }
        };
        let claims: Claims = super::claims::decode_jwt(token)?;

        req.extensions_mut().insert(claims);

        // call the next endpoint.
        self.ep.call(req).await
    }
}
