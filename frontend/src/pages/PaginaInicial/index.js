import React, { useState } from "react";

import {Box, Grid, Paper, Typography, ButtonBase} from '@mui/material'
import { styled } from '@mui/material/styles';

import './style.css'
import TopBar from "../../components/TopBar";
import Rodape from "../../components/Rodape";

import imageFilter from '../../assets/filter.svg'
import ImagemProblema from '../../assets/buraco.jpg'
import AlertIcon from '../../assets/alertIcon.svg'

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

export default function PaginaInicial(){
    const [reclamacoes, setReclamacoes] = useState([1,2,3])

    return(
        <div>
            <TopBar />
            
            <div className="container">
                <div className="containerFiltros">
                    <button className="buttoFilter">No seu estado</button>
                    <button className="buttoFilter">No seu estado</button>
                    <img className="imagemFiltro" src={imageFilter}/>
                </div>

                <div className="containerReclamacoes">
                    <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                {reclamacoes.map( (reclamacao) => {
                        return(
                            
                            <Paper
                            sx={{
                              p: 2,
                              margin: 'auto',
                              maxWidth: 500,
                              flexGrow: 1,
                              border: '1px solid red', 
                              backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            }}
                          >
                            <Grid item container spacing={2}>
                              
                              <Grid item xs={6} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                  <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                      Av. Cipriano Santos 468
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                      Buraco no asfalto
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Atrasado
                                    </Typography>
                                  </Grid>
                                  <Grid item direction='columm'>
                                    <Typography variant="subtitle1" component="div" sx={{textAlign: 'right'}}>
                                        <ButtonBase >
                                            <Img alt="complex" src={AlertIcon} width={40}/>
                                        </ButtonBase>
                                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                            10
                                        </Typography>
                                    </Typography>

                                    <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                      01/01/23
                                    </Typography>
                                    
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={6}>
                                <ButtonBase >
                                  <Img alt="complex" src={ImagemProblema} />
                                </ButtonBase>
                              </Grid>
                            </Grid>
                          </Paper>
                            
                        )
                    })}
                    </Grid>
                    </Box>
                </div>
            </div>
        </div>
    )
}