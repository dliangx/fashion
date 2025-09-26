import { Detail } from "../data/Product";

const calcDeliverTime = () => {
  var date = new Date();
  date.setDate(date.getDate() + 30);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

const deliverBeginTime = () => {
  var date = new Date();
  date.setDate(date.getDate() + 3);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

const Details = (props: { details: Detail[] }) => {
  return (
    <div className="mt-8">
      {props.details.map((item, index) => {
        return (
          <div key={index}>
            {item.t != 2 && (
              <div className="mt-8">
                <h2>{item.title}</h2>
                <div>
                  {item.detail.split(";").map((line, index2) => {
                    return (
                      <div className="mt-2" key={index2}>
                        {line} <br />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {item.t == 2 && (
              <div className="mt-8">
                <h2>{item.title}</h2>
                <div>Estimated to be delivered on</div>
                <div>
                  {deliverBeginTime()} - {calcDeliverTime()}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Details;
