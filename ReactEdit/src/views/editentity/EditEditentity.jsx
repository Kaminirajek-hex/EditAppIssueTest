import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editEditentity, fetchEditentity } from './store/editentity.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditEditentity = () => {
    const { id: editentityId } = useParams()

    const editentity = useSelector((state) =>
        state.editentity.entities.find(
            (editentity) => editentity.id.toString() === editentityId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [editone, setEditone] = useState(editentity.editone)

    const [edittwo, setEdittwo] = useState(editentity.edittwo)

    const [editthree, setEditthree] = useState(editentity.editthree)

    const handleEditone = (e) => setEditone(e.target.value)
    const handleEdittwo = (e) => setEdittwo(e.target.value)
    const handleEditthree = (e) => setEditthree(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editEditentity({
                id: editentityId,
                editone,
                edittwo,
                editthree,
            })
        ).then(() => {
            dispatch(fetchEditentity())
        })
        navigate('/editentity')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditEditentity', path: '/editentity' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="editone"
                                id="editoneInput"
                                onChange={handleEditone}
                                value={editone}
                                validators={['required']}
                                label="Editone"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={edittwo}
                                onChange={handleEdittwo}
                                select
                                id="edittwoInput"
                                label="Edittwo"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>
                            <TextField
                                type="number"
                                name="editthree"
                                id="editthreeInput"
                                onChange={handleEditthree}
                                value={editthree || ''}
                                validators={['required']}
                                label="Editthree"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditEditentity
