﻿import { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Ayat, QuranData, Translation } from './QuranData';
import NavBar, { NavigationMode, NavigationModel } from './components/NavBar';
import QuranViewer from './components/QuranViewer';
import SettingsPanel, { ReadingMode, SettingsModel } from './components/SettingsPanel';
import translationList from './assets/translation-list.json'

function App() {
    const [quranData] = useState<QuranData>(new QuranData());

    let getNavData = (): NavigationModel => {
        const storedNavModelString = localStorage.getItem('NavigationModel');
        const storedNavModel: NavigationModel = storedNavModelString ? JSON.parse(storedNavModelString)
            : {
                navMode: NavigationMode.Ruku,
                serial: 1,
                ayat: quranData.ayats[0]
            }

        let searchParams = new URLSearchParams(location.search);
        const navMode = searchParams.get('navMode');
        if (navMode) {
            const serialNumber = +(searchParams.get('serial') || -1);
            const ayatNumber = +(searchParams.get('ayat') || -1);

            return {
                navMode: NavigationMode[navMode as keyof typeof NavigationMode],
                serial: serialNumber ?? storedNavModel.serial,
                ayat: quranData.ayats[ayatNumber - 1] ?? storedNavModel.ayat,
            }
        }

        return storedNavModel;
    };
    const getDefaultTranslation = (): Translation => {
        let navLang = navigator.languages[navigator.languages.length - 1] ?? 'en';

        return translationList.filter(f => f.language == navLang)[0];
    }

    const storedSettingsModelString = localStorage.getItem('SettingsModel');
    const storedSettingsModel: SettingsModel = storedSettingsModelString ? JSON.parse(storedSettingsModelString)
        : {
            readingMode: ReadingMode.Ruku_By_Ruku,
            quranFont: 'hafs',
            translations: [getDefaultTranslation()],
            tafsirs:[]
        }

    const [navigationModel, setNavigationModel] = useState<NavigationModel>(getNavData());
    const [settingsModel, setSettingsModel] = useState<SettingsModel>(storedSettingsModel);

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        onSettingsChanged(settingsModel);
    }, []);

    function setNavDataToSearchParams(model: NavigationModel) {
        const url = new URL(window.location.href);

        for (let prop in model) {
            url.searchParams.delete(prop);
        }

        let navModeString = NavigationMode[model.navMode];
        url.searchParams.set('navMode', navModeString);

        url.searchParams.set('serial', model.serial.toString());

        if (model.ayat)
            url.searchParams.set('ayat', String(model.ayat?.serial));

        window.history.pushState({}, '', url.toString());
    }

    const onNavigate = (model: NavigationModel) => {
        setNavigationModel(model);
        localStorage.setItem('NavigationModel', JSON.stringify(model));
        setNavDataToSearchParams(model);
        forceUpdate();
    }

    const onAyatSelection = (selectedAyat: Ayat) => {
        navigationModel.ayat = selectedAyat;
        setNavigationModel(navigationModel);
        localStorage.setItem('NavigationModel', JSON.stringify(navigationModel));
        setNavDataToSearchParams(navigationModel);
    }

    const onSettingsChanged = (model: SettingsModel) => {
        setSettingsModel(model);
        localStorage.setItem('SettingsModel', JSON.stringify(model));

        quranData.setTranslations(model.translations, forceUpdate);
        quranData.setTafsirs(model.tafsirs, forceUpdate);
    }


    return (
        <>
            <NavBar quranData={quranData}
                navigationModel={navigationModel}
                onNavigate={onNavigate} />

            <QuranViewer quranData={quranData}
                navigationModel={navigationModel}
                settingsModel={settingsModel}
                onNavigate={onNavigate}
                onAyatSelection={onAyatSelection} />

            <SettingsPanel settingsModel={settingsModel}
                onChange={onSettingsChanged} />
        </>
    )
}

export default App
