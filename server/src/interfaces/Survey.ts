import { survey_extra } from './Survey';

export enum type_answer {
        //TODO survey的问题类型,前后通用
        radio,
        text,
}


export interface answer {
        answer_id?: string,
        answer_text: string,
        answer_img?: string
}
export interface survey_extra {
        
        
        survey_note?: string,
        start_date?: number,
        end_data?: number
}
export interface question {

        question_id?: string,
        question_text: string,
        question_img?: string,
        question_type: type_answer,
        answers?: answer[]

}
export interface survey_interface {
        
        survey_name:string,
        create_user: string
        survey_id: string
        survey_info?: survey_extra,
        question_container?: [question]
}

