import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography, Input } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { HuePicker } from 'react-color';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from "notistack";
import MyContext from '../Context';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[700],
    },
    secondary: {
      // This is green.A700 as hex.
      main: grey[400],
    },
  },
});



const CustomTable = styled(Table)(
  ({ theme }) => ({
    border: `3px solid ${theme.palette.primary.main}`,
    '& thead': {
      '& th': {
        background: '#191919',
        color: 'white',
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        borderRight: `3px solid ${theme.palette.primary.main}`,
        fontSize: '1.5rem'
      },
    },
    '& tbody': {
      '& td': {
        background: '#191919',
        color: 'white'


      },
      '& td:not(:last-child)': {
        borderRight: '1px solid black',
      },
    },

    '& tbody': {
      '& tr td': {
        background: '#191919',
        color: 'white',
        borderLeft: '2px solid black',
        borderBottom: '2px solid black',
        fontSize: '1rem'
      },
      '& tr:last-child td': {
        borderBottom: 'none',
      },
    },







  })
);












function FormularioCategoria() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [color, setColor] = useState('#ffffff');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { forceUpdate } = useContext(MyContext);
  const [categorias, setCategorias] = useState([]);
  const [editingCategoria, setEditingCategoria] = useState(null);





  const volverMain = () => {


    navigate('/');

  }

  useEffect(() => {


    fetchData();
  }, []);




  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/categorias');
      const data = await response.json();
      setCategorias(data);


    } catch (error) {
      console.error('Error fetching data de la  API:', error);
    }
  };
  const data = [

  ];

  const handleChange = (newColor) => {
    setColor(newColor.hex);
  };

  // const onSubmit = async (data) => {
  //   try {


  //     data.categoriaColor = data.categoriaColor || color;
  //     const response = await axios.post('http://localhost:3001/categorias', data);
  //     console.log(response.data);
  //     console.log(response.status);
  //     enqueueSnackbar('Categoria agregada correctamente', {
  //       variant: 'success',
  //       anchorOrigin: {
  //         vertical: 'top',
  //         horizontal: 'right',
  //       },
  //     });

  //     volverMain();
  //     forceUpdate();
  //   } catch (error) {
  //     console.error(error);
  //     enqueueSnackbar('Hubo un problema el video no pudo ser insertado', {
  //       variant: 'error',
  //       anchorOrigin: {
  //         vertical: 'top',
  //         horizontal: 'right',
  //       },
  //     });
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      if (editingCategoria) {
        data.categoriaColor = color;
        const response = await axios.put(`http://localhost:3001/categorias/${editingCategoria.id}`, data);
        console.log(response.data);
        console.log(response.status);
   
        // data.categoriaColor = color;
        // const url = `http://localhost:3001/categorias/${editingCategoria.id}`;
        // await axios.put(url, data);
      } else {

        data.categoriaColor = data.categoriaColor || color;
        await axios.post('http://localhost:3001/categorias', data);
      }
      enqueueSnackbar(
        editingCategoria
          ? 'Categoria actualizada correctamente'
          : 'Categoria agregada correctamente',
        {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        }
      );
      volverMain();
      forceUpdate();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Hubo un problema y la categoria no pudo ser guardada', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };



  const deleteCategoria = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/categorias/${id}`);
      fetchData();
      volverMain();
      forceUpdate();
      enqueueSnackbar('Categoría borrada correctamente', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });


    } catch (error) {
      console.error(error);
    }
  };

  // const editCategoria = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/categorias/${id}`);
  //     fetchData();
  //     volverMain();
  //     forceUpdate();


  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  const editCategoria = (id) => {

    const categoria = categorias.find((c) => c.id === id);
    reset({
      categoriaNombre: categoria.categoriaNombre,
      categoriaTexto: categoria.categoriaTexto,
      categoriaColor: categoria.categoriaColor,
      codigoSeguridad: categoria.codigoSeguridad,
    });
    setColor(categoria.categoriaColor);

    setEditingCategoria(categoria);
  };



  const resetForm = () => {
    reset(); // Reset the form values to their initial state
  };

  return (

    <ThemeProvider theme={theme}>



      <Box sx={{ height: "auto", backgroundColor: '#191919', paddingTop: '1rem', paddingBottom: '2rem', minWidth: '320px' }}>

        <Container maxWidth="xl" >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid rowSpacing={5} container sx={{
            }}>
              <Grid item xs={12}  >
                <Typography align='center' variant='h3' color="#ffffff"  > Nueva Categoria</Typography>

              </Grid>

              <Grid item xs={12}>

                <Controller
                  name="categoriaNombre"
                  control={control}
                  defaultValue={editingCategoria ? editingCategoria.categoriaNombre : ""}

                  rules={{ required: 'Nombre de categoria es requerido' }}
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        sx={{ backgroundColor: '#53585D', color: 'white' }}
                        variant="filled"
                        error={!!errors.nombre}
                        // helperText={fieldState.error?.message}
                        fullWidth
                        label="Nombre"
                        id="categoriaNombre"
                        InputLabelProps={{
                          sx: {},
                        }}
                      />
                      {errors.nombre && (
                        <Typography variant="body2" color="error">
                          {errors.nombre.message}
                        </Typography>
                      )}
                    </div>

                  )}
                />

              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="categoriaTexto"
                  control={control}
                  defaultValue={editingCategoria ? editingCategoria.categoriaTexto : ""}
                  rules={{ required: 'La descripcion es requerida' }}
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        error={!!errors.descripcion}
                        sx={{ backgroundColor: '#53585D', color: 'white' }}
                        variant="filled"
                        fullWidth
                        label="Descripción"
                        id="categoriaTexto"
                        multiline rows={5}
                      />
                      {errors.descripcion && (
                        <Typography variant="body2" color="error">
                          {errors.descripcion.message}
                        </Typography>
                      )}



                    </div>
                  )}
                />


              </Grid>

              <Grid item xs={12} >

                {/* 
                <HuePicker width style={{ width: '100%' }} color={color} onChange={handleChange} /> */}
                <Controller
                  name="categoriaColor"
                  control={control}
                  defaultValue={editingCategoria ? editingCategoria.categoriaColor : ""}
                  render={({ field }) => (
                    <div>
                      <HuePicker width style={{ width: '100%' }} color={color} onChange={handleChange} />
                      <input type="hidden" {...field} value={color} />
                    </div>
                  )}
                />




              </Grid>

              <Grid item xs={12}>

                <Controller
                  name="codigoSeguridad"
                  control={control}
                  defaultValue={editingCategoria ? editingCategoria.codigoSeguridad : ""}
                  rules={{ required: 'Codigo de seguridad es requerido' }}
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        sx={{ backgroundColor: '#53585D', color: 'white' }}
                        variant="filled"

                        error={!!errors.codigoSeguridad}
                        fullWidth
                        label="codigo de seguridad"
                        id="codigoSeguridad"
                      />
                      {errors.codigoSeguridad && (
                        <Typography variant="body2" color="error">
                          {errors.codigoSeguridad.message}
                        </Typography>
                      )}


                    </div>
                  )}
                />


              </Grid>

              <Grid item xs={12} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }} >

                <ButtonGroup variant="contained" size="large" aria-label="small button group"
                  sx={{
                    '& > *': {
                      marginRight: '16px', // Adjust the default margin between buttons
                    },
                    '& > *:nth-child(2)': {
                      marginLeft: '32px', // Adjust the left margin for the second button
                    },
                    '@media (max-width:960px)': {
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',

                      '& > *': {
                        marginRight: '0px', // Adjust the default margin between buttons
                      },
                      '& > *:nth-child(2)': {
                        marginLeft: '0px', // Adjust the left margin for the second button
                      },

                    }
                  }}
                >


                  <Button sx={{ width: 150 }} color="primary" type="submit">Guardar</Button>
                  <Button onClick={resetForm} sx={{ width: 150 }} color="secondary">Limpiar</Button>

                </ButtonGroup>



              </Grid>






            </Grid >
          </form>
          <Box sx={{marginTop: "2rem"}}>
          <Grid >
            <Grid item xs={12}>

              <TableContainer sx={{ width: '100%' }} component={Paper}>
                <CustomTable>
                  <TableHead>
                    <TableRow >
                      <TableCell>Nombre</TableCell>
                      <TableCell>Descripcion</TableCell>
                      <TableCell>Editar</TableCell>
                      <TableCell>Remover</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categorias.map((row, index) => (
                      <TableRow key={row.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5' }}>
                        <TableCell>{row.categoriaNombre}</TableCell>
                        <TableCell>{row.categoriaTexto}</TableCell>
                        <TableCell><button onClick={() => editCategoria(row.id)}>Editar</button></TableCell>
                        <TableCell> <button onClick={() => deleteCategoria(row.id)}>Delete</button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </CustomTable>
              </TableContainer>

            </Grid>


          </Grid>
          </Box> 
        </Container>
      </Box>

    </ThemeProvider>
  )
}

export default FormularioCategoria