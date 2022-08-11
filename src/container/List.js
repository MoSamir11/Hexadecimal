import React, { useState } from "react";
import {styled,Table,TableBody,Button,TableContainer,TableCell,tableCellClasses,TableHead,Container,TableRow,Paper} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { BounceLoader } from "react-spinners";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#089bab",
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const List = () => {
    const [data,setData] = useState();
    useEffect(async ()=>{
        await axios.get("http://localhost:3002")
            .then(res=>{
                console.log("32-->",res.data);
                setData(res.data.data)
            })
    },[])
    console.log(data);
  return (
    <Container style={{ padding: "1rem 6rem 0 6rem" }}>
        <h1 className="text-center">User List</h1>
        {data && data.length?
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial No</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Username</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">City</StyledTableCell>
              <StyledTableCell align="right">Company</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {
                  data.map((user,index)=>{
                      return(
                          <>
                            <StyledTableRow>
                                <StyledTableCell component="th" align="center" scope="row">{index+1}</StyledTableCell>
                                <StyledTableCell align="center">{user.name}</StyledTableCell>
                                <StyledTableCell align="center">{user.username}</StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">{user.address.city}</StyledTableCell>
                                <StyledTableCell align="center">{user.company.name}</StyledTableCell>
                            </StyledTableRow>
                          </>
                      )
                  })
              }
          </TableBody>
        </Table>
      </TableContainer>:<div className="text-center" style={{ marginTop: '20%', marginRight: '6%' }}>
                  <BounceLoader size={100} color="#089bab" />
          </div>}
    </Container>
  );
};
