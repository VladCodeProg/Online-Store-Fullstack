import React from 'react';
import {Card, CardContent, Grid, Typography} from '@material-ui/core';
import { useStore } from '../index';
import { observer } from 'mobx-react-lite';

const BrandSelect = observer(() => {
    const {device} = useStore();

    return (
        <Grid container>
            {device.brands.map(brand => (
                <Grid item xs={2} key={brand.id}>
                    <Card
                        variant="outlined"
                        onClick={() => device.setActiveBrand(brand)}
                        style={{
                            border: `1px solid ${device.activeBrand.id === brand.id ? '#416dff' : '#c0c0c0'}`,
                            cursor: 'pointer'
                        }}
                    >
                        <CardContent>
                            <Typography
                                style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}
                            >
                                {brand.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
});

export default BrandSelect