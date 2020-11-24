import React, { useState, useEffect } from 'react';
import Header from '../elements/Header';
import Gallery from '../elements/Gallery';
import Spinner from '../elements/Spinner';
import { useForm } from '../hooks/form-hook';

const initialFormState = {
  keyword: {
    value: '',
    valid: false,
  },
  records: {
    value: '',
    valid: false
  },
  interval: {
    value: '',
    valid: false
  },
  repeat: {
    value: false,
    valid: true
  }
};

const Index = props => {
  const [loading, setLoading] = useState(true);
  const [apiResults, setApiResults] = useState(null);
  const [headerClass, setHeaderClass] = useState('');
  const [formState, inputHandler] = useForm(initialFormState, false);
  const keyword = formState.inputs.keyword.value;
  const records = formState.inputs.records.value;
  const interval = Number(formState.inputs.interval.value);
  const repeat = formState.inputs.repeat.value;

  const getApiResults = async event => {
    event && event.preventDefault();
    setLoading(true);
    const apiCall = await fetch(`http://localhost:9000/images?query=${keyword}&total=${records}`);
    const results = await apiCall.json();
    setApiResults(results);
    setLoading(false);
    setHeaderClass('minimized');
  };

  const resetForm = () => {
    setHeaderClass('');
  };

  useEffect(() => {
    async function getImages() {
      const apiCall = await fetch(`http://localhost:9000/images?query=kansas+city&total=1`);
      const results = await apiCall.json();
      setApiResults(results);
      setLoading(false);
    }
    getImages();
  }, []);

  if (loading) {
    return (
      <Spinner />
    );
  }

  return (
    <>
      <Header onSubmit={getApiResults} onInput={inputHandler} formState={formState} resetForm={resetForm} class={headerClass} />
      {apiResults.results.length && <Gallery records={records} interval={interval} repeat={repeat} results={apiResults.results} />}
      {!apiResults.results.length && <div className="message alert">Bummer. No results were found. <span className="close">X</span></div>}
    </>
  );
};

export default Index;
