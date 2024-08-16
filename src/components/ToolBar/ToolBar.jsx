import "./ToolBar.css";

const ToolBar = () => {

    return (
        <>
            <div className="topbar">
                <div className="search">
                    <label>
                        <input type="text" placeholder="Search here" />
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                </div>
                <div className="user">
                    <img src="assets/imgs/customer01.jpg" alt="" />
                </div>
            </div>
        </>
    );
};

export default ToolBar;
