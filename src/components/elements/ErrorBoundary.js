import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <Dialog open>
                    <DialogTitle>
                        Error
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Something went wrong. Please try again later.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            )
        }

        return children;
    }
}

export default ErrorBoundary;