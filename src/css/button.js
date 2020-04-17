import {css} from 'lit-element';

export const button = css`
    button {
        background-color: var(--calendar-background);
        border:none;
        width: 100%;
        height: 100%;
    }
    button:active {
        outline: none;
        border: none;
    }
        
    button:focus {outline:0;}

    i{

        border: solid var(--calendar-greyed-color);
        border-width: 0 0.1875rem 0.1875rem 0;
        display: inline-block;
        padding: 0.3125rem;
    }
    button:hover>i{
        border: solid var(--calendar-color);
        border-width: 0 0.1875rem 0.1875rem 0;
    }

    .previous{
        margin-top: 0.875rem;
        transform: rotate(-135deg);
    }
    .next{
        transform: rotate(45deg);
    }
`
