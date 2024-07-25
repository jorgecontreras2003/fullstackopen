const Persons = ({ handleFilter }) => {
    return (
        <ul>
            {handleFilter()}
        </ul>
    )
}

export default Persons