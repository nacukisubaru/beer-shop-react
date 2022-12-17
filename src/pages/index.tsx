import Menu from "../app/components/Drawer/Menu/Menu";

const Home = () => {
    return (
        <>
            <div className="page-container">
                This is home page nigga!
                <Menu callbackApplyFilter={()=>{}} callbackResetFilter={()=>{}} filter={{minPrice: 0, maxPrice: 0, productType: ''}} filterList={[]}/>
            </div>
        </>
    );
}

export default Home;