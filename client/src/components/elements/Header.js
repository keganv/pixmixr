import React from 'react';
import Field from './form/Field';
import {VALIDATOR_MAX, VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../utilities/validators';

const fonts = ['monoton', 'rock-salt', 'audiowide', 'knewave'];
const style = fonts[Math.floor(Math.random() * fonts.length)];

const Header = props => {
  return (
    <>
      <header role="banner" className={props.class}>
        <h1 id="logo" className={style}>PixMix<span>R</span></h1>
        {
          props.class === 'minimized' &&
          <button className="reset" onClick={props.resetForm} type="button">&#9881;</button>
        }
        <form name="image-form" onSubmit={props.onSubmit}>
          <Field
            element="input"
            id="keyword"
            type="text"
            label="Keyword"
            error=""
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
            onInput={props.onInput}
            value={props.formState.inputs.keyword.value}
            valid={props.formState.inputs.keyword.valid}
          />
          <Field
            element="input"
            id="records"
            type="number"
            label="# Pictures"
            error=""
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(10), VALIDATOR_MAX(100)]}
            onInput={props.onInput}
            value={props.formState.inputs.records.value}
            valid={props.formState.inputs.records.valid}
            min={10}
            max={100}
          />
          <Field
            element="select"
            id="interval"
            label="Transition Speed"
            options={[
              {label: '10', value: 10},
              {label: '15', value: 15},
              {label: '20', value: 20},
              {label: '30', value: 30},
              {label: '45', value: 45},
              {label: '60', value: 60},
            ]}
            error=""
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="Select Interval"
            onInput={props.onInput}
            value={props.formState.inputs.interval.value}
            valid={props.formState.inputs.interval.valid}
          />
          <Field
            element="toggle"
            id="repeat"
            type="checkbox"
            class="toggle"
            label="Repeat"
            onInput={props.onInput}
            error=""
            validators={[]}
            value={props.formState.inputs.repeat.value}
            valid={props.formState.inputs.repeat.valid}
          />
          <div className="form-field full">
            <button type="submit" aria-label="Create Gallery" disabled={!props.formState.valid}>
              Create Gallery
            </button>
          </div>
        </form>
      </header>
    </>
  );
};

export default Header;
