import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addEditentity, fetchEditentity } from './store/editentity.action'

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

const AddEditentity = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [editone, setEditone] = useState('')
    const [edittwo, setEdittwo] = useState('')
    const [editthree, setEditthree] = useState('')

    const handleEditone = (e) => setEditone(e.target.value)
    const handleEdittwo = (e) => setEdittwo(e.target.value)
    const handleEditthree = (e) => setEditthree(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addEditentity({
                editone,
                edittwo,
                editthree,
            })
        ).then(() => {
            dispatch(fetchEditentity())
        })
        navigate('/editentity')
    }

    useEffect(() => {
        return () => {
            setEditone('')
            setEdittwo('')
            setEditthree('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddEditentity', path: '/editentity' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="editone"
                                id="editoneInput"
                                onChange={handleEditone}
                                value={editone}
                                label="Editone"
                            />

                            <TextField
                                value={edittwo}
                                onChange={handleEdittwo}
                                select
                                id="edittwoInput"
                                label="Edittwo"
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
                                label="Editthree"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddEditentity
