import React from "react";
import { Backdrop, Box, Button, CircularProgress, TextField, } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useEmployeeLazyQuery, usePrinterQueryLazyQuery, } from "../generated/graphql";
import { useTranslation } from "react-i18next";

export interface Tester {
    ID: number,
    Name: string
}

export interface Printer {
    Server: string,
    Name: string,
    DisplayName: string,
}

interface SettingsProps {
    onPrintersSet: (printers: Printer) => void
    onTesterSet: (tester: Tester) => void
    onErrorOccured: (error: string) => void
}


export default function Settings(props: SettingsProps) {
    const { onPrintersSet, onTesterSet, onErrorOccured } = props;
    const [queryPrinter, { data: printerData, loading: printerLoading, error: printerError }] = usePrinterQueryLazyQuery();
    const [queryTester, { data: testerData, loading: testerLoading, error: testerError }] = useEmployeeLazyQuery();
    const printerInputReference = useRef<HTMLInputElement>(null);
    const testerInputReference = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        printerInputReference?.current?.select()
    }, []);

    useEffect(() => {
        if (printerData) {
            // onPrintersSet(printerData.PrinterQuery)
            console.log(printerData)
        }
    }, [printerData, onPrintersSet]);


    useEffect(() => {
        if (printerError) {
            onErrorOccured(printerError.message)
        }

        if (testerError) {
            testerInputReference?.current?.select()
            onErrorOccured(testerError.message)
        }
    }, [printerError, testerError, testerInputReference, onErrorOccured]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
                data-testid='printerInput'
                variant="standard"
                InputLabelProps={{
                    sx: {
                        fontSize: { sm: '1rem', md: '1.5rem', lg: '2rem', xl: '2.5rem' },
                    }
                }}
                InputProps={{
                    inputMode: 'none',
                    inputProps: {
                        inputMode: 'none',
                        autoComplete: 'off'
                    },
                    sx: {
                        fontSize: { sm: '2rem', md: '3rem', lg: '4rem', xl: '5rem' },
                        color: 'black'
                    }
                }}
                label={t('printerInputLabel')}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        queryPrinter({
                            variables: {
                                displayName: (e.target as HTMLInputElement).value
                            }
                        });
                    }
                }}
                inputRef={printerInputReference}
            />
            <TextField
                data-testid='testerIdInput'
                variant="standard"
                InputLabelProps={{
                    sx: {
                        fontSize: { sm: '1rem', md: '1.5rem', lg: '2rem', xl: '2.5rem' },
                    }
                }}
                InputProps={{
                    inputMode: 'none',
                    inputProps: {
                        inputMode: 'none',
                        autoComplete: 'off'
                    },
                    sx: {
                        fontSize: { sm: '2rem', md: '3rem', lg: '4rem', xl: '5rem' },
                        color: 'black'
                    }
                }}
                label={t('lockTesterIdLabel')}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        queryTester({
                            variables: {
                                loginId: parseInt((e.target as HTMLInputElement).value)
                            }
                        });
                    }
                }}
                inputRef={testerInputReference}
            />
        </Box>
    )

}
