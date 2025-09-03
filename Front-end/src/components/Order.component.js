import ErrorIcon from '@mui/icons-material/Error';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
    Box,
    Button,
    Paper,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Grid
} from "@mui/material";
import { getOrder } from "../queries/order.queries";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
    const { data, refetch, isFetching, isSuccess, isError } = useQuery(
        { queryKey: ['orders'], queryFn: getOrder, enabled: false, gcTime: 0 }
    );
    console.log(data)
    const renderTable = (title, orders) => (
        <TableContainer component={Paper} sx={{ maxWidth: 300, margin: 2 }}>
            <Typography variant="h6" sx={{ p: 2 }}>
                {title}
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Price</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow key={index}>
                            <TableCell>{order.price}</TableCell>
                            <TableCell>{order.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
    return (
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Button
                variant="contained"
                loading={isFetching}
                disabled={isFetching}
                onClick={refetch}
                sx={{ width: "fit-content" }}
            >
                {"Get order"}
            </Button>
            <Paper
                sx={{
                    width: "80%",
                    minHeight: 300,
                    maxWidth: 800,
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                elevation={3}
            >
                {
                    isFetching && <CircularProgress />
                }
                {
                    isSuccess && !isFetching &&
                    <Grid container spacing={2} sx={{ margin: 2 }}>
                        <Grid>{renderTable("Bids (Buy Orders)", data.data.bids)}</Grid>
                        <Grid>{renderTable("Asks (Sell Orders)", data.data.asks)}</Grid>
                    </Grid>
                }
                {
                    isError &&
                    <>
                        <ErrorIcon sx={{ fontSize: 60, color: "#b71c1c" }} />
                        <Box sx={{ fontSize: 14, color: "#b71c1c" }}>Request failed</Box>
                    </>
                }
                {
                    !data && !isFetching && !isError &&
                    <>
                        <FolderOpenIcon sx={{ fontSize: 60, color: "#9e9e9e" }} />
                        <Box sx={{ fontSize: 14, color: "#9e9e9e" }}>No data</Box>
                    </>
                }
            </Paper>
        </Box>
    );
};

export default Order;