import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromBookSubscriptions from './bookSubscriptions.reducers';

// Extends the app state to include the bookSubscription feature.
// This is required because bookSubscriptions are lazy loaded.
// So the reference to BookSubscriptionState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    bookSubscriptions: fromBookSubscriptions.BookSubscriptionState;
}

// Selector functions
const getBookSubscriptionFeatureState = createFeatureSelector<fromBookSubscriptions.BookSubscriptionState>('bookSubscriptions');


export const getCurrentBookSubscriptionId = createSelector(
    getBookSubscriptionFeatureState,
    state => state.currentBookSubscriptionId
);

export const getCurrentBookSubscription = createSelector(
    getBookSubscriptionFeatureState,
    getCurrentBookSubscriptionId,
    (state, currentBookSubscriptionId) => {
        if (currentBookSubscriptionId === 0) {
            return {
                bookSubId: 0,  
                bookName: '',
                coverFileName: '',
                userId: ''              
            };
        } else {
            return currentBookSubscriptionId ? state.bookSubscriptions.find(p => p.bookSubId === currentBookSubscriptionId) : null;
        }
    }
);

export const getBookSubscriptions = createSelector(
    getBookSubscriptionFeatureState,
    state => state.bookSubscriptions
);

export const getError = createSelector(
    getBookSubscriptionFeatureState,
    state => state.error
);
