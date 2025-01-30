function PersonForm(props) {
    return (
        <form onSubmit={props.functions.addContact}>
          <div>name: <input value={props.functions.newName} onChange={props.functions.handleNameChange} /></div>
          <div>number: <input value={props.functions.newNumber} onChange={props.functions.handleNumberChange} /></div>
          <div><button type="submit">add</button></div>
        </form>
    );
}

export default PersonForm;