

export interface player {
        palyer_id?: string,
        player_name:string,
        player_text: string,
        //暂时上传一张就够了
        player_img?: string,
        player_tel?:number
}
export interface vote_extra {
        vote_note?: string, //奖品说明,
        start_date?: number,
        end_data?: number,
        sign_up_after_begin:boolean
}

export interface vote_interface {
        vote_name:string,
        create_user: string
        vote_id: string
        vote_extra?: vote_extra,
        player_container?: [player]
}

