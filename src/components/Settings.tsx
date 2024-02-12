import React from "react";
import { Backdrop, Button, CircularProgress, TextField, } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useEmployeeLazyQuery, usePrinterListLazyQuery } from "../generated/graphql";
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
    printer: Printer | null
    tester: Tester | null
    onOptionsSet: (printer: Printer | null, tester: Tester | null) => void
    onErrorOccured: (error: string) => void
}


export default function Settings(props: SettingsProps) {
    const { printer, tester, onOptionsSet, onErrorOccured } = props;

    const [queryPrinters, { data: printerListData, loading: printerListLoading, error: printerListError }] = usePrinterListLazyQuery();
    const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(printer ? printer : null);
    const [printerInput, setPrinterInput] = useState<string | null>(printer ? printer.DisplayName : null)
    const printerInputReference = useRef<HTMLInputElement>(null);

    const [testerID, setTesterID] = useState(tester?.ID || "")
    const [queryTesterID, { data: testerData, loading: testerLoading, error: testerError }] = useEmployeeLazyQuery();
    const testerInputReference = useRef<HTMLInputElement>(null);

    const { t } = useTranslation();

    function getSelectedPrinter(printerList: Printer[] | null, printer: string | null) {
        const sp = printerList?.find(p => p.DisplayName === printer)
        if (!sp) {
            onErrorOccured("INCORRECT_PRINTER_ERROR")
            return null
        } else {
            onErrorOccured("")
            return sp;
        }

    }

    if (!printerListData && !printerListLoading && !printerListError) {
        queryPrinters();
    }

    useEffect(() => {
        const storedPrinter = localStorage.getItem("selectedPrinter");
        if (storedPrinter) {
            setSelectedPrinter(JSON.parse(storedPrinter));
        }
    }, []);

    useEffect(() => {
        if (selectedPrinter) {
            setPrinterInput(selectedPrinter.DisplayName);
        }
    }, [selectedPrinter])

    useEffect(() => {
        if (!selectedPrinter && printerListData) {
            printerInputReference?.current?.select()

        }
        if (selectedPrinter && printerListData) {
            testerInputReference?.current?.select()

        }
    }, [selectedPrinter, printerListData]);

    useEffect(() => {
        if (selectedPrinter && testerData?.Employee) {
            localStorage.setItem("selectedPrinter", JSON.stringify(selectedPrinter));
            onOptionsSet(selectedPrinter, testerData.Employee);
        }
    }, [testerData, selectedPrinter, onOptionsSet])

    useEffect(() => {
        if (printerListError) {
            onErrorOccured(printerListError.message)
        }

        if (testerError) {
            testerInputReference?.current?.select()
            onErrorOccured(testerError.message)
        }
    }, [printerListError, testerError, testerInputReference, onErrorOccured]);

    return (
        <>
            {!printerListLoading && !testerLoading &&
                <>
                    <div className="OptionsPanel-printer">
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
                                    if (printerListData) {
                                        setSelectedPrinter(getSelectedPrinter(printerListData.PrinterList, printerInput));
                                    }
                                }
                            }}
                            onClick={() => {
                                if (printerInputReference.current) {
                                    printerInputReference.current.select()
                                }
                            }}
                            value={printerInput}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                setPrinterInput(e.target.value.toLowerCase())
                            }}
                            inputRef={printerInputReference}
                        />
                    </div>
                    <div className="OptionPanel-tester">
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
                                    queryTesterID({
                                        variables: {
                                            loginId: parseInt((e.target as HTMLInputElement).value)
                                        }
                                    });
                                }
                            }}
                            onClick={() => {
                                if (testerInputReference.current) {
                                    testerInputReference.current.select()
                                }
                            }}
                            value={testerID}
                            onChange={(event) => event.target.value && event.target.value !== "" ? setTesterID(parseInt(event.target.value) || testerID) : setTesterID("")}
                            inputRef={testerInputReference}
                        />
                    </div>

                    <div>
                        <Button
                            variant="contained"
                            data-testid='doneButton'
                            style={{ padding: '1rem', paddingLeft: '2rem', paddingRight: '2rem', margin: '1rem' }}
                            sx={{
                                fontSize: { sm: '1rem', md: '1.25rem', lg: '1.5rem', xl: '2.5rem' }
                            }}
                            disabled={selectedPrinter ? false : true}
                            onClick={() => {
                                localStorage.setItem("selectedPrinter", JSON.stringify(selectedPrinter));
                                onOptionsSet(selectedPrinter, testerData?.Employee || tester || null)
                            }}
                        >
                            {t('doneButton')}
                        </Button>
                    </div>
                </>
            }
            <Backdrop
                sx={{ color: '#fff', opacity: '10%' }}
                open={printerListLoading}
            >
                <div className='App-loading'>
                    <CircularProgress
                        size={250}
                    />
                </div>
            </Backdrop>
        </>
    )

}
