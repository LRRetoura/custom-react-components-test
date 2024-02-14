import React from "react";
import { Stack, TextField, } from "@mui/material";
import { useEffect, useRef } from "react";
import { useEmployeeLazyQuery, usePrinterQueryLazyQuery, } from "../generated/graphql";

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
    onPrinterSet: (printer: Printer) => void
    onTesterSet: (tester: Tester) => void
    onErrorOccured: (error: string) => void
}

export default function Settings(props: SettingsProps) {
    const { onPrinterSet, onTesterSet, onErrorOccured } = props;
    const [queryPrinter, { data: printerData, loading: printerLoading, error: printerError }] = usePrinterQueryLazyQuery();
    const [queryTester, { data: testerData, loading: testerLoading, error: testerError }] = useEmployeeLazyQuery();
    const printerInputReference = useRef<HTMLInputElement>(null);
    const testerInputReference = useRef<HTMLInputElement>(null);
    useEffect(() => {
        printerInputReference?.current?.select()
    }, []);

    useEffect(() => {
        if (printerData) {
            const printer = printerData.PrinterQuery as Printer
            console.log(printer)
            // onPrintersSet(printerData.PrinterQuery)
        }
    }, [printerData, onPrinterSet]);


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
        <Stack spacing={1}>
            <TextField
                data-testid='printerInput'
                variant="outlined"
                InputLabelProps={{
                    sx: {
                        fontSize: { sm: '0.75rem', md: '1rem', lg: '1.25rem', xl: '1.5rem' },
                    }
                }}
                InputProps={{
                    inputMode: 'none',
                    inputProps: {
                        inputMode: 'none',
                        autoComplete: 'off'
                    },
                    sx: {
                        fontSize: { sm: '1rem', md: '1.5rem', lg: '2rem', xl: '2.5rem' },
                        color: 'black'
                    }
                }}
                label={"🖶"}
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
                variant="outlined"
                InputLabelProps={{
                    sx: {
                        fontSize: { sm: '0.75rem', md: '1rem', lg: '1.25rem', xl: '1.5rem' },
                    }
                }}
                InputProps={{
                    inputMode: 'none',
                    inputProps: {
                        inputMode: 'none',
                        autoComplete: 'off'
                    },
                    sx: {
                        fontSize: { sm: '1rem', md: '1.5rem', lg: '2rem', xl: '2.5rem' },
                        color: 'black'
                    }
                }}
                label={"👤"}
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
        </Stack>
    )

}
