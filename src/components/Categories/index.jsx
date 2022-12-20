import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import addIcon from '../../assets/addIcon.png';
import deleteIcon from '../../assets/trash.svg';
import lightsIcon from '../../assets/light.svg';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import DeleteModal from '../DeleteModal';

import "./style.css"

export default function Categories() {

  const { logout, token, config, categories, setCategories } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [categoryName, setCategoryName] = useState("")
  const [categoryId, setCategoryId] = useState("")

  useEffect(() => {
    api.get(`/category/listCategory`, config).then(response => {

      setCategories(response.data);

    }).catch(err => {
      console.log(token)

      if (err.response === undefined) {
        console.log("não existem categorias");

      } else {
        console.log(err.response);
        logout();
      }
    })
  }, [])

  const handleDeleteCategory = async (id, name) => {

    if (confirmName === categoryName) {
      await api.delete(`/category/delete/${id}`, config).then(res => {
        console.log(res.data);
        toast.success(`Categoria ${capitalizeFirstLetter(name)} excluída`, { className: "success-toast" })
        setConfirmPopUp(false);

        api.get(`/category/listCategory`, config).then(response => {

          setCategories(response.data);

        }).catch(err => {
          console.log(token)

          if (err.response === undefined) {
            console.log("não existem categorias");

          } else {
            console.log(err.response);
            logout();
          }
        })
      }).catch((err) => {
        toast.error("Não foi possível excluir a categoria", { className: "error-toast" });
        console.log(err)
    })} 
  };

  function activateButton() {
    if (confirmName === categoryName) {
      return false;
    } else {
      return true;
    }
  }

  function capitalizeFirstLetter(string) {
    const names = string.split(" ");
    for (let i = 0; i < names.length; i++) {

      if (names[i] === "de" || names[i] === "De" || names[i] === "do" || names[i] === "dos" || names[i] === "Do" || names[i] === "Dos" || names[i] === "da" || names[i] === "das" || names[i] === "Da" || names[i] === "Das" || names[i] === "e" || names[i] === "E") {
        //console.log(names[i])
        names[i] = names[i][0].toLowerCase() + names[i].substr(1);
      } else {
        names[i] = names[i][0].toUpperCase() + names[i].substr(1);
      }
    }
    return names.join(" ");
  }

  function replaceSpecialChars(string) {
    string = string.replace(/[àáâãä]/, "a");
    string = string.replace(/[èéêë]/, "e");
    string = string.replace(/[ìíî]/, "i");
    string = string.replace(/[òóôõö]/, "o");
    string = string.replace(/[ç]/, "c");

    return string.replace(/[^a-z0-9]/gi, '');
  }

  return (
    <div>

      <input className="search" type="text" placeholder="Pesquise pelo nome da categoria" onChange={(event) => {
        setSearchTerm(event.target.value);
      }} />

      <button className="addButton">
        <img src={addIcon} className="addIcon" />
        Cadastrar categoria
      </button>

      <div className="list">
        {categories.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }).filter((event) => {
          if (searchTerm === "") {
            return event
          } else if (replaceSpecialChars(event.name.toLowerCase()).includes(replaceSpecialChars(searchTerm.toLowerCase()))) {
            return event
          }
        }).map((category) => (
          <div className="card" id="card-category">
            <div className="card-title">
              <div>
                <img src={lightsIcon} className="icon-category"></img>
                <p className="card-name">{capitalizeFirstLetter(category.name)}</p>
              </div>
              <img src={deleteIcon} className="delete-icon" onClick={() => {
                setConfirmPopUp(true) 
                setCategoryName(capitalizeFirstLetter(category.name))
                setCategoryId(category._id)
              }}></img>
            </div>
            <div className="devices-amount" id="spaces">
              {/* location.deviceAmount -> ver como pegar a quantidade de dispositivos por localização (filtro no back?) */}
              <p className="devices-amount-number">100</p>
              <p className="devices-amount-text">Aparelhos cadastrados</p>
            </div>
          </div>
        ))}

        {confirmPopUp ?
          <DeleteModal
            title={'Categoria'}
            name={capitalizeFirstLetter(categoryName)}
            onChange={(event) => {
              setConfirmName(event.target.value);
            }}
            type={'nessa categoria'}
            cancelButton={() => setConfirmPopUp(false)}
            onClick={() => handleDeleteCategory(categoryId, categoryName)}
            freezeButton={activateButton()}
          />
          : null}

      </div>
    </div>
  );
}
