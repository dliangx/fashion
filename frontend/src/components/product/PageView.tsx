import { useState } from "react";
import { Page } from "../data/Product";
import { Back, Forward } from "../common/Icon";

const PageView = (props: {
  total: number;
  pageSize: number;
  onclick: (page: Page) => void;
}) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const len: number =
    Math.floor(props.total / props.pageSize) +
    (props.total % props.pageSize == 0 ? 0 : 1);
  const maxShowLen = 6;
  let left = pageIndex;
  let right = pageIndex;
  while (right - left < maxShowLen) {
    if (left > 0) {
      left--;
    }
    if (right < len) {
      right++;
    }
    if (left == 0 && right == len) {
      break;
    }
  }

  const numbers = [];
  for (let i = left; i < right; i++) {
    numbers.push(i);
  }
  return (
    <div className="grid  place-content-center ">
      <div className="flex space-x-4 mt-4  mb-8">
        {left > 0 && (
          <button>
            <Back
              onClick={() => {
                setPageIndex(pageIndex > 0 ? pageIndex - 1 : pageIndex);
              }}
            />
          </button>
        )}
        {numbers.map((num) => {
          return (
            <button
              className={`w-8 h-8 ${
                pageIndex == num ? "bg-black" : "bg-gray-200"
              } ${pageIndex == num ? "text-white" : "text-black"} `}
              onClick={() => {
                setPageIndex(num);
                props.onclick({
                  start: props.pageSize * num,
                  num: props.pageSize,
                });
              }}
              key={num}
            >
              {num + 1}
            </button>
          );
        })}
        {right < len && (
          <button>
            <Forward
              onClick={() => {
                setPageIndex(pageIndex < len - 1 ? pageIndex + 1 : pageIndex);
              }}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default PageView;
