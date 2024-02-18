import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronUp,
  faChevronDown
} from "@fortawesome/fontawesome-free-solid"

interface IProps {
  open?: boolean;
  title: string;
  children: any;
}

function Guide({ open, children, title } : IProps) {

  const [isOpen, setIsOpen] = useState(open);

  const handleFilteringOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="card">
        <div>
          <div className="p-3 border-bottom d-flex justify-content-between">
            <h6 className="font-weight-bold">{title}</h6>
            <button type="button" className="btn" onClick={handleFilteringOpening}>
              {!isOpen ? (
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
              ) : (
                <FontAwesomeIcon icon={faChevronUp as IconProp} />
              )}
            </button>
          </div>
        </div>

        <div className="border-bottom">
          <div>{isOpen && <div className="p-3">{children}</div>}</div>
        </div>
      </div>
    </>
  );
};

export default Guide;
