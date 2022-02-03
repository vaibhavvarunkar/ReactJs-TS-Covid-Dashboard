import React from 'react';
import Select, { SingleValue } from 'react-select';
import { IStateObj } from '../constants/constants';
import "../styles/component styles/Dropdown.css"


type Props = {
      stateNames:Array<IStateObj>  
      getStateName:(arg: string) => void
}

const Dropdown:React.FC<Props>= ({stateNames, getStateName}) => {

    const getDropdownValue = (option: SingleValue<IStateObj>) =>{
        getStateName(option!.value)
    }
    return(
        <>
         <Select onChange={(option) => getDropdownValue(option)} placeholder="Select State" className="dropdown" options={stateNames} />
        </>
        )
}
   

export default Dropdown;
