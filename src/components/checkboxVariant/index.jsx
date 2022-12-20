import React, { useState, useRef, useEffect } from "react";
import "./style.css";

export default function DropdownVariavel({
  escolhidos,
  setEscolhidos,
  type,
  data,
  title,
}) {
  const ref = useRef();

  //const [isAll, setIsAll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      const checkboxe = document.getElementById("checkboxes-" + type);
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        checkboxe.style.display = "none";

        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen, type]);

  function showCheckbox() {
    const checkboxe = document.getElementById("checkboxes-" + type);
    if (!isMenuOpen) {
      checkboxe.style.display = "flex";
      setIsMenuOpen(true);
    } else {
      checkboxe.style.display = "none";
      setIsMenuOpen(false);
    }
  }

  function alterarCheckboxes(aux) {
    const isSelected = escolhidos.filter((a) => a === aux.target.id);
    const checkboxes2 = document.getElementsByName(
      "checkboxes[]" + aux.target.id
    );

    if (checkboxes2.length !== 0) {
      let checkboxes3;

      if (aux.target.checked) {
        let listaAux = [];
        for (let i = 0; i < checkboxes2.length; i++) {
          listaAux.push(checkboxes2[i].id);
          checkboxes2[i].checked = true;

          checkboxes3 = document.getElementsByName(
            "checkboxes[]" + checkboxes2[i].id
          );
          if (checkboxes3.length !== 0) {
            for (let i = 0; i < checkboxes3.length; i++) {
              //if (checkboxes3[i].id != "corruptions index") {
              listaAux.push(checkboxes3[i].id);

              // }
              checkboxes3[i].checked = true;
            }
          }
        }

        setEscolhidos([...escolhidos, ...listaAux]);
        return;
      }
      let listaAux = [];
      let aux2 = false;
      let aux3 = false;

      for (let i = 0; i < checkboxes2.length; i++) {
        checkboxes2[i].checked = false;
        checkboxes3 = document.getElementsByName(
          "checkboxes[]" + checkboxes2[i].id
        );
        if (checkboxes3.length !== 0) {
          for (let i = 0; i < checkboxes3.length; i++) {
            checkboxes3[i].checked = false;
          }
        }
      }

      for (let i = 0; i < escolhidos.length; i++) {
        aux2 = false;
        aux3 = false;

        for (let j = 0; j < checkboxes2.length; j++) {
          if (escolhidos[i] === checkboxes2[j].id) {
            aux2 = true;
          }
          checkboxes3 = document.getElementsByName(
            "checkboxes[]" + checkboxes2[j].id
          );

          if (checkboxes3.length !== 0) {
            for (let k = 0; k < checkboxes3.length; k++) {
              if (escolhidos[i] === checkboxes3[k].id) {
                aux3 = true;
              }
            }
          }
        }
        if (aux2 === false && aux3 === false) {
          listaAux.push(escolhidos[i]);
        }
      }
      setEscolhidos([...listaAux]);
      return;
    }

    if (isSelected.length === 0) {
      setEscolhidos([...escolhidos, aux.target.id]);
    } else {
      setEscolhidos(escolhidos.filter((item) => item !== aux.target.id));
      //Se quiser, quando desmarcar um, descamar o all
      //setIsAll(false);
      console.log(isSelected);
    }
  }

  return (
    <div className="checkbox-container" ref={ref} isEmpty={escolhidos.length <= 0}>
      <div className="filter-name">{title}:</div>
      <div
        className="selectBox"
        onClick={() => {
          setIsMenuOpen((oldState) => !oldState);
          showCheckbox();
        }}
      >
        <select>
          <option>
            {escolhidos.length <= 0
              ? `Selecione uma ou mais ${type}`
              : escolhidos.join(", ")}
          </option>
        </select>
        <div className="overSelect" />
      </div>

      <div id={"checkboxes-" + type} onChange={(e) => alterarCheckboxes(e)}>
        {Object.keys(data).map((item, index) => {
          return item !== undefined ? (
            <div id="primarioCheckbox" key={data[item] + index}>
              <label htmlFor={data[item] + index}>
                <input
                  type="checkbox"
                  id={data[item] + index}
                  name={"checkboxes[]" + item}
                />
                {item.charAt(0).toUpperCase() + item.slice(1, item.length)}
              </label>

              {data[item] !== undefined
                ? Object.keys(data[item]).map((item2, index2) => {
                    return (
                      <div
                        id={
                          typeof data[item][item2] === "string"
                            ? "finalCheckbox"
                            : "secundarioCheckbox"
                        }
                        key={data[item][item2] + index2}
                      >
                        {typeof data[item][item2] !== "object" ? (
                          <label htmlFor={data[item][item2]}>
                            <input
                              type="checkbox"
                              id={data[item][item2]}
                              name={"checkboxes[]" + data[item] + index}
                            />
                            {data[item][item2]}
                          </label>
                        ) : (
                          <label htmlFor={item2}>
                            <input
                              type="checkbox"
                              id={item2}
                              name={"checkboxes[]" + data[item] + index}
                            />
                            {item2}
                          </label>
                        )}

                        {typeof data[item][item2] === "object"
                          ? Object.keys(data[item][item2]).map(
                              (item3, index3) => {
                                return (
                                  <div
                                    id="finalCheckbox"
                                    key={data[item][item2][item3] + index3}
                                  >
                                    <label
                                      htmlFor={data[item][item2][item3] + ""}
                                    >
                                      <input
                                        type="checkbox"
                                        id={data[item][item2][item3] + ""}
                                        name={"checkboxes[]" + item2}
                                      />
                                      {data[item][item2][item3]}
                                    </label>
                                  </div>
                                );
                              }
                            )
                          : null}
                      </div>
                    );
                  })
                : null}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}