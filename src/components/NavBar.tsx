﻿import { NavigationMode, QuranData } from '../QuranData';

function NavBar({ quranData, navigationModel, onNavigate }: NavBarProps) {

    const triggerOnNavigate = () => {
        onNavigate(navigationModel);
    };

    const handleNavigationModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let selectedItem = event.target.value;
        const selectedNavigationMode: NavigationMode = NavigationMode[selectedItem as keyof typeof NavigationMode];
        navigationModel.navMode = selectedNavigationMode;
        triggerOnNavigate();
    };

    const handleSuraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        navigationModel.serial = +event.target.value;
        triggerOnNavigate();
    };

    const handleJuzChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        navigationModel.serial = +event.target.value;
        triggerOnNavigate();
    };

    const handleHizbChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        navigationModel.serial = +event.target.value;
        triggerOnNavigate();
    };

    const handleRukuChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        navigationModel.serial = +event.target.value;
        triggerOnNavigate();
    };

    const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        navigationModel.serial = +event.target.value;
        triggerOnNavigate();
    };

    return <nav className='navbar fixed-top px-2'>
        <button className="btn btn-dark d-none" type="button" title="Menu"
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
        </button>

        <h1 className="nav-title">Quran Majid</h1>

        <div className="">
            <select className="select me-1 me-md-2" value={NavigationMode[navigationModel.navMode]} onChange={handleNavigationModeChange} title="Navigation Mode">
                {Object.keys(NavigationMode).filter(f => isNaN(f as any)).map(item => <option key={item} value={item}>{item}</option>)}
            </select>
            {navigationModel.navMode == NavigationMode.Sura &&
                <select className="select" value={navigationModel?.serial} onChange={handleSuraChange} title="Sura">
                    {quranData.suras.map(item => <option key={item.serial} value={item.serial}>{item.serial}. {item.tname}</option>)}
                </select>
            }
            {navigationModel.navMode == NavigationMode.Juz &&
                <select className="select" value={navigationModel?.serial} onChange={handleJuzChange} title="Juz">
                    {quranData.juzs.map(item => <option key={item.serial} value={item.serial}>{item.serial}</option>)}
                </select>
            }
            {navigationModel.navMode == NavigationMode.Hizb &&
                <select className="select" value={navigationModel?.serial} onChange={handleHizbChange} title="Hizb">
                    {quranData.hizb_quarters.map(item => <option key={item.serial} value={item.serial}>{item.serial}</option>)}
                </select>
            }
            {navigationModel.navMode == NavigationMode.Ruku &&
                <select className="select" value={navigationModel?.serial} onChange={handleRukuChange} title="Ruku">
                    {quranData.rukus.map(item => <option key={item.serial} value={item.serial}>{item.serial}. {item.displayText}</option>)}
                </select>
            }
            {navigationModel.navMode == NavigationMode.Page &&
                <select className="select" value={navigationModel?.serial} onChange={handlePageChange} title="Ruku">
                    {quranData.pages.map(item => <option key={item.serial} value={item.serial}>{item.serial}</option>)}
                </select>
            }
        </div>

        <div className="offcanvas offcanvas-start bg-dark text-white" id="offcanvasLeft" data-bs-scroll="true" aria-labelledby="offcanvasLeftLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasLeftLabel">
                    Menu
                </h4>
                <button type="button" className="btn-close bg-secondary text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <h5>Navigation Mode</h5>
                <select className='select w-100 m-0' value={NavigationMode[navigationModel.navMode]} onChange={handleNavigationModeChange} title="Navigation Mode">
                    {Object.keys(NavigationMode).filter(f => isNaN(f as any)).map(item => <option key={item} value={item}>{item}</option>)}
                </select>
                <hr />
                {navigationModel.navMode == NavigationMode.Sura &&
                    <select className='select w-100 m-0' value={navigationModel?.serial} onChange={handleSuraChange} title="Sura">
                        {quranData.suras.map(item => <option key={item.serial} value={item.serial}>{item.serial}. {item.tname}</option>)}
                    </select>
                }
                {navigationModel.navMode == NavigationMode.Juz &&
                    <select className='select w-100 m-0' value={navigationModel?.serial} onChange={handleJuzChange} title="Juz">
                        {quranData.juzs.map(item => <option key={item.serial} value={item.serial}>{item.serial}</option>)}
                    </select>
                }
                {navigationModel.navMode == NavigationMode.Hizb &&
                    <select className='select w-100 m-0' value={navigationModel?.serial} onChange={handleHizbChange} title="Hizb">
                        {quranData.hizb_quarters.map(item => <option key={item.serial} value={item.serial}>{item.serial}</option>)}
                    </select>
                }
                {navigationModel.navMode == NavigationMode.Ruku &&
                    <select className='select w-100 m-0' value={navigationModel?.serial} onChange={handleRukuChange} title="Ruku">
                        {quranData.rukus.map(item => <option key={item.serial} value={item.serial}>{item.serial}. {item.displayText}</option>)}
                    </select>
                }
                {navigationModel.navMode == NavigationMode.Page &&
                    <select className='select w-100 m-0' value={navigationModel?.serial} onChange={handlePageChange} title="Ruku">
                        {quranData.pages.map(item => <option key={item.serial} value={item.serial}>{item.serial}</option>)}
                    </select>
                }
            </div>
        </div>

        <button className="btn theme-colored border" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sliders2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
            </svg>
            <span className="d-none d-md-inline ms-2">Settings</span> 
        </button>
    </nav>;
}

export default NavBar

interface NavBarProps {
    quranData: QuranData,
    navigationModel: NavigationModel,
    onNavigate: (model: NavigationModel) => void
}

export interface NavigationModel {
    navMode: NavigationMode,
    serial: number,
    ayat: number
}