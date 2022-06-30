import React, {FC} from "react";
import style from "./PropertyRow.module.scss";
import {useNavigate} from "react-router-dom";

export interface IPropertyRow {
    prop: string
    value: string | undefined
    to: string | undefined
}

export const PropertyRow: FC<IPropertyRow> = ({prop, value, to}) => {
    const navigate = useNavigate();
    if (!value) return null;
    return (
       <div className={style.propertyRow}>
           <p>{prop}</p>
           {
               to ? (
                   <button onClick={() => {
                       navigate(to);
                   }}>
                       {value}
                   </button>
               ) : (
                   <p>{value}</p>
               )
           }
       </div>
    )
}