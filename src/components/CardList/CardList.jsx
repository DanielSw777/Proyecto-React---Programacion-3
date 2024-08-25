import "./CardList.css";

const CardList = ({ list }) => {

    return (
        <>
            <div className="list-card">
                <img src={list.cover} alt={list.name} />
                <div className="list-info">
                    <h3 className="list-title">{list.name}</h3>
                    <button type='button' className="list-play">
                        View
                    </button>
                </div>
            </div>
        </>
    )
}

export default CardList;
