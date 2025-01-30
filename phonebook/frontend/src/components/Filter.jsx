function Filter(props) {
    return (
        <div>
            Search contacts <input onChange={props.callback} />
        </div>
    );
}

export default Filter;