# Fashion

openfashion rust backend implement, using shuttle sass platform.


## Software Architecture

hosting in shuttle sass platform,Shuttle is a Rust-native cloud development platform that lets you deploy your Rust apps for free. you can handle all development operation only using terminal,without web configuration. it supply a free shared database for you development. if you publish you service you can using you own database.It can be well integrated with AI through hugeface's candle framework, and recommendation services will be implemented through it in the future.

## Rust Server Implement

using poem middleware impl jwt authorization. it's a full-featured and easy-to-use web framework with the Rust programming language.Debugging time is drastically reduced after the code is written. I rarely used debugging in the whole process of this project.

## Develop ,Build and Publish

develop: cargo shuttle run
