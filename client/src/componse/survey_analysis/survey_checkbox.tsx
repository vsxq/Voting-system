import * as React from 'react';
import { Table } from './table';
import {Survey_head} from "./survey_head"

export const Survey_checkbox = () => {
    return (<div>
        <Survey_head type="多选"></Survey_head>
        <div>
            <Table></Table>
            </div>
    </div>)
}