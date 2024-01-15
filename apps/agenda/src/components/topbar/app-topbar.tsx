import React, { FC } from 'react';
import { classNames } from 'primereact/utils';
import { useRouter } from 'next/navigation';

interface AppTopbarProps {
    topbarMenuActive: boolean;
    rotateMenuButton: boolean;
    activeTopbarItem: string | null;
    profileMode: string;
    horizontal: boolean;
    onMenuButtonClick: (event:any) => void;
    onTopbarMenuButtonClick: (event:any) => void;
    onTopbarItemClick: (event: { originalEvent: Event, item: string }) => void;
}

const AppTopbar: FC<AppTopbarProps> = (props) => {
    const router = useRouter();

    const goDashboard = (): void => {
        router.push('/');
    };

    const topbarItemsClassName = classNames('topbar-items fadeInDown', { 'topbar-items-visible': props.topbarMenuActive });
    const menuButtonClassName = classNames('p-link', { 'menu-button-rotate': props.rotateMenuButton });
    const profileItemClassName = classNames('profile-item', { 'active-top-menu': props.activeTopbarItem === 'profile' });
    return (
        <div className="topbar clearfix">
            <div className="topbar-left">
                <button className="p-link" onClick={goDashboard}>
                    <img alt="Logo" src="assets/layout/images/logo.png" className="topbar-logo" />
                </button>
            </div>

            <div className="topbar-right">
                <button className={menuButtonClassName} id="menu-button" onClick={props.onMenuButtonClick}>
                    <i className="pi pi-angle-left"></i>
                </button>

                <button className="p-link" id="topbar-menu-button" onClick={props.onTopbarMenuButtonClick}>
                    <i className="pi pi-bars"></i>
                </button>
                <ul className={topbarItemsClassName}>
                    {(props.profileMode === 'top' || props.horizontal) && (
                        <li className={profileItemClassName} onClick={(e) => props.onTopbarItemClick({ originalEvent: e, item: 'profile' })}>
                            <button className="p-link">
                                <img alt="User" className="profile-image" src="assets/layout/images/avatar.png" />
                                <div>
                                    <span className="topbar-item-name">Isabel Lopez</span>
                                    <span className="topbar-item-role">Marketing</span>
                                </div>
                            </button>
                            <ul className="layout-menu fadeInDown">
                                <li role="menuitem">
                                    <button className="p-link">
                                        <i className="pi pi-fw pi-user"></i>
                                        <span>Profile</span>
                                    </button>
                                </li>
                                <li role="menuitem">
                                    <button className="p-link">
                                        <i className="pi pi-fw pi-lock"></i>
                                        <span>Privacy</span>
                                    </button>
                                </li>
                                <li role="menuitem">
                                    <button className="p-link">
                                        <i className="pi pi-fw pi-cog"></i>
                                        <span>Settings</span>
                                    </button>
                                </li>
                                <li role="menuitem">
                                    <button className="p-link">
                                        <i className="pi pi-fw pi-sign-out"></i>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    )}

                    <li className={classNames({ 'active-top-menu': props.activeTopbarItem === 'settings' })} onClick={(e) => props.onTopbarItemClick({ originalEvent: e, item: 'settings' })}>
                        <button className="p-link">
                            <i className="topbar-icon pi pi-fw pi-cog"></i>
                            <span className="topbar-item-name">Settings</span>
                        </button>
                        <ul className="layout-menu fadeInDown">
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-fw pi-palette"></i>
                                    <span>Change Theme</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-fw pi-star-o"></i>
                                    <span>Favorites</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-fw pi-lock"></i>
                                    <span>Lock Screen</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-fw pi-image"></i>
                                    <span>Wallpaper</span>
                                </button>
                            </li>
                        </ul>
                    </li>

                    <li className={classNames({ 'active-top-menu': props.activeTopbarItem === 'messages' })} onClick={(e) => props.onTopbarItemClick({ originalEvent: e, item: 'messages' })}>
                        <button className="p-link">
                            <i className="topbar-icon pi pi-fw pi-envelope"></i>
                            <span className="topbar-badge">5</span>
                            <span className="topbar-item-name">Messages</span>
                        </button>
                        <ul className="layout-menu fadeInDown">
                            <li role="menuitem">
                                <button className="p-link topbar-message">
                                    <img alt="Avatar 1" src="assets/layout/images/avatar1.png" width="35" />
                                    <span>Give me a call</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link topbar-message">
                                    <img alt="Avatar 2" src="assets/layout/images/avatar2.png" width="35" />
                                    <span>Sales reports attached</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link topbar-message">
                                    <img alt="Avatar 3" src="assets/layout/images/avatar3.png" width="35" />
                                    <span>About your invoice</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link topbar-message">
                                    <img alt="Avatar 4" src="assets/layout/images/avatar2.png" width="35" />
                                    <span>Meeting today at 10pm</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link topbar-message">
                                    <img alt="Avatar 5" src="assets/layout/images/avatar4.png" width="35" />
                                    <span>Out of office</span>
                                </button>
                            </li>
                        </ul>
                    </li>

                    <li className={classNames({ 'active-top-menu': props.activeTopbarItem === 'notifications' })} onClick={(e) => props.onTopbarItemClick({ originalEvent: e, item: 'notifications' })}>
                        <button className="p-link">
                            <i className="topbar-icon pi pi-fw pi-bell"></i>
                            <span className="topbar-badge animated rubberBand">4</span>
                            <span className="topbar-item-name">Notifications</span>
                        </button>

                        <ul className="layout-menu fadeInDown">
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-fw pi-sliders-h"></i>
                                    <span>Pending tasks</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-fw pi-calendar"></i>
                                    <span>Meeting today at 3pm</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-fw pi-download"></i>
                                    <span>Download documents</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link">
                                    <i className="pi pi-fw pi-bookmark"></i>
                                    <span>Book flight</span>
                                </button>
                            </li>
                        </ul>
                    </li>

                    <li className={classNames('search-item', { 'active-top-menu': props.activeTopbarItem === 'search' })} onClick={(e) => props.onTopbarItemClick({ originalEvent: e, item: 'search' })}>
                        <div className="topbar-search">
                            <input type="text" placeholder="Search" />
                            <i className="pi pi-search"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AppTopbar;