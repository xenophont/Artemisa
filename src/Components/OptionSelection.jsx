import React from "react";

export default function OptionSelection(
    { arrayItems , selectOption } // props
){
    return (
        <>
            <h1 className="heading">Choose your Flow:</h1>

            <div className="grid-main">
                {arrayItems.map((item) => {
                    return <div className="grid-child" key={item.name} onClick={() => selectOption(item.option)}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    </div>
                })}
            </div>
        </>
    )
}

/*export default function OptionSelection({ options, selected, onSelect }) {
  return (
    <div className="option-selection">
      {options.map((option) => (
        <div
          key={option}
          className={`option ${option === selected ? "selected" : ""}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}*/