import React from "react";
import Pagination from "@mui/material/Pagination";
import FormHelperText from "@mui/material/FormHelperText";
import PaginationItem from "@mui/material/PaginationItem";
import { ResultList } from "../Components/ResultList";
import { LyricsResultList } from "../Components/LyricsResultList";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const ResultView = ({
    currentPageSize,
    handlePageSizeChange,
    currentPage,
    handlePageChange,
    results,
    isFromElastic
}) => {
    const maxAmmount = 10;
    const rangeValues = Array.from({ length: maxAmmount }, (_, i) => i + 1);

    return (
        <div className="results-container">
            <div className="results-header">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        size="small"
                        value={currentPageSize}
                        onChange={handlePageSizeChange}
                        style={{
                            background: "white",
                        }}
                    >
                        {rangeValues.map((value) => (
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText style={{ color: "white" }}>
                        Cantidad por pagina:
                    </FormHelperText>
                </FormControl>
            </div>
            {isFromElastic ?
                <LyricsResultList results={results} />
                :
                <ResultList results={results} />
            }
            <Pagination
                count={maxAmmount} // Total number of pages
                page={currentPage} // Current page
                onChange={handlePageChange}
                style={{ display: "flex", justifyContent: "center" }}
                renderItem={(item) => (
                    <PaginationItem {...item} style={{ color: "white" }} />
                )}
            />
        </div>
    );
};
