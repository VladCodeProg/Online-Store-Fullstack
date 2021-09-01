import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import { useStore } from '../index';
import { observer } from 'mobx-react-lite';

const TypeSelect = observer(() => {
    const {device} = useStore();

    return (
        device.types.map(type => (
            <Card
                variant="outlined"
                style={{
                    cursor: 'pointer',
                    border: `1px solid ${device.activeType.id === type.id ? '#416dff' : '#c0c0c0'}`
                }}
                onClick={() => device.setActiveType(type)}
                key={type.id}
            >
                <CardContent>
                    <Typography
                        style={{
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                    >
                        {type.name}
                    </Typography>
                </CardContent>
            </Card>
        ))
    )
});

export default TypeSelect