import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className='max-w-[1200px] mx-auto'>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link to='/'>
                        <button className="btn btn-ghost normal-case text-xl">
                            Task Hub
                        </button>
                    </Link>
                </div>
                <div className="flex-none">
                    <button className="btn btn-outline font-semibold" onClick={() => window.my_modal_1.showModal()}>
                        Add Task
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;