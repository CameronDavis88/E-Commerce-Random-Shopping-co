import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    box: {
        marginTop: '15%'
    },
    root: {
        marginTop: '5%',
        maxWidth: '100%',
        boxSizing: 'border-box',
    },
    media: {
        height: 0,
        // paddingTop: '56.25%',
        paddingTop: '5%',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));