/* eslint-disable camelcase */
interface RestrictedWordDto {
    id: string;
    full_word: string;
    created_by: string;
    deleted_by: string;
    created_at: string;
    super_restricted: boolean;
    deleted_at: string;
    deleted: boolean;
}

export default RestrictedWordDto;
