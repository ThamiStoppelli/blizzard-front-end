import React, { useContext, useState, useEffect } from "react";

import api from "../../services/api";
import { AuthContext } from '../../contexts/auth';
import arrowupIcon from '../../assets/arrow-up.svg';
import arrowdownIcon from '../../assets/arrow-down.svg';

import "./style.css";

function CheckboxInput({
  locationId, locationName, isActive,

}) {
  const [showSpaces, setShowSpaces] = useState(false);
  const [dropdownButton, setDropdownButton] = useState(arrowdownIcon);
  const [block, setBlock] = useState("");
  const { config, spaces, setSpaces, checkedSpaces, setCheckedSpaces } = useContext(AuthContext);
  const [NoSpaces, setNoSpaces] = useState(false);

  const [isCheckBlock, setIsCheckBlock] = useState(false);
  const [isCheckSpace, setIsCheckSpace] = useState(false);
  const listBlocks = [];
  const listSpaces = [];


  useEffect(() => {
    handleDropdown();
  }, [block])

  function dynamicSort(event) {
    var sortOrder = 1;

    if (event[0] === "-") {
      sortOrder = -1;
      event = event.substr(1);
    }

    return function (a, b) {
      if (sortOrder === -1) {
        return b[event].localeCompare(a[event]);
      } else {
        return a[event].localeCompare(b[event]);
      }
    }
  }

  function handleDropdown() {
    setBlock(locationName);

    api.get(`/spaces/list?name=${block}`, config).then(response => {

      console.log(response.data.OK)
      setNoSpaces(false);

      if (response.data.OK.length === 0) {
        setNoSpaces(true);
      } else {
        setSpaces(response.data.OK);
        console.log(spaces)
      }

    }).catch(err => {
      console.log(err)
    })

    if (NoSpaces) {
      console.log(`não existem espaços cadastrados na localização ${block}`);
    } else {
      setShowSpaces(!showSpaces);
      if (showSpaces) {
        setDropdownButton(arrowdownIcon)
      } else if (!showSpaces) {
        setDropdownButton(arrowupIcon)
      }
    }
  }

  function handleCheckBlock() {

    if (isCheckBlock) {
      setIsCheckBlock(false);
      setCheckedSpaces([]);

    } else { 
      setIsCheckBlock(true);
      for(let i = 0; i < spaces.length; i++) {
        listSpaces.push(spaces[i]._id)
      }
      setCheckedSpaces(listSpaces);
      
      document.getElementById(locationId).onclick = function() {
        var checkboxes = document.getElementsByClassName('checkspaces');
        for (var checkbox of checkboxes) {
            checkbox.checked = this.checked;
        }
      }
    }
    console.log(isCheckBlock)
    console.log(checkedSpaces)
  }

  function handleCheckSpace() {

    if (isCheckBlock) {
      setIsCheckBlock(false);
      setCheckedSpaces([]);

    } else { 
      setIsCheckBlock(true);
      for(let i = 0; i < spaces.length; i++) {
        listSpaces.push(spaces[i]._id)
      }
      setCheckedSpaces(listSpaces);
      
      document.getElementById(locationId).onclick = function() {
        var checkboxes = document.getElementsByClassName('checkspaces');
        for (var checkbox of checkboxes) {
            checkbox.checked = this.checked;
        }
      }
    }
    console.log(isCheckBlock)
    console.log(checkedSpaces)
  }

  return (

    <div className="locations-open-dropdown">

      <div  className="locations-select">
        <input
          type="checkbox"
          id={locationId}
          name={locationName}
          onChange={() => { console.log(locationId)}}
          onClick={() => handleCheckBlock() }
          className="checkblocks" />
        <div className="locations-dropdown" onClick={() => handleDropdown()}>
          <label for={locationId}>{locationName}</label>
          
          {NoSpaces ? null :
            <img src={dropdownButton} />
          }
        </div>

      </div>

      {showSpaces ?
        spaces.sort(dynamicSort('name')).map((space) => (
          <div className="spaces-select">
            <input 
            type="checkbox" 
            id={space._id} 
            name={space.name}
            onChange={() => { console.log(space._id)}} 
            onClick={() => handleCheckSpace() }
            className="checkspaces" />
            <label for={space._id}>{space.name}</label>
          </div>
        )) : null}

    </div>

  );
};

export default CheckboxInput;