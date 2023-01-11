import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CatalogBeers from "../Products/Catalog/CatalogBeers";

interface TabsUIProps {
    tabsList: string[];
    swipeableList: any[];
}

const TabsUI: React.FC<TabsUIProps> = ({ tabsList, swipeableList }) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <Tabs value={value} onChange={handleChange} centered>
                    {tabsList.map((tab) => {
                       return <Tab label={tab} style={{fontSize: "16px"}}/>;
                    })}
                </Tabs>
            </Box>

            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {swipeableList.map((item) => {
                    return item;
                })}
            </SwipeableViews>
        </Box>
    );
};

export default TabsUI;
