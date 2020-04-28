import React from 'react'
import NumberFormat from "react-number-format";

const NumberFormatCustom = (props) => {

    /* Metodo para formatear los campos de contabilidad  */
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
        // isNumericString
        />
    );
}
export default NumberFormatCustom
