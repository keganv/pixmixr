import React, { useReducer, useEffect } from 'react';
import { validate } from '../../utilities/validators';
import '../../../styles/toggle.css'

const inputReducer = (state, action) => {
  const validation = validate(action.value, action.validators);
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        valid: validation.valid,
        error: validation.error
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
        value: action.value,
        valid: validation.valid,
        error: validation.error
      }
    }
    default:
      return state;
  }
};

const Field = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value,
    isTouched: false,
    valid: props.valid,
    error: ''
  });

  const {id, onInput} = props;
  const {value, valid} = inputState;

  useEffect(() => {
    onInput(id, value, valid)
  }, [id, onInput, valid, value]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = event => {
    dispatch({
      type: 'TOUCH',
      value: event.target.value,
      validators: props.validators
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.label}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        min={props.min}
        max={props.max}
      />
    ) : props.element === 'toggle' ? (
      <label className="toggle" htmlFor={props.id}>
        <input
          id={props.id}
          type={props.type}
          placeholder={props.label}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          min={props.min}
          max={props.max}
        />
        <span className="slider round"></span>
        <span className="label">{props.label}</span> {props.subLabel && <span>{props.subLabel}</span>}
      </label>
    ) : props.element === 'textarea' ? (
      <textarea
        id={props.id}
        className={props?.class}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <select
        id={props.id}
        placeholder={props.label}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={props.value}
      >
        <option value={null}>{props.label}</option>
        {props.options.map((option, i) => (
          <option key={`option.label-${i}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );

  return (
    <div className={`form-field ${(!inputState.valid && inputState.isTouched) ? 'invalid' : 'valid'}`}>
      {element}
      {!inputState.valid && inputState.isTouched &&
        <div className="error">{inputState.error}</div>
      }
    </div>
  );
};

export default Field;
