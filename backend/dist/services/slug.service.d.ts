import { type ISlug } from "../models/slug.model.js";
declare const _default: {
    createSlug: (data: ISlug) => Promise<import("mongoose").Document<unknown, {}, ISlug, {}, {}> & ISlug & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getSlug: ({ url_slug, password, }: {
        url_slug: string;
        password: string;
    }) => Promise<(import("mongoose").Document<unknown, {}, ISlug, {}, {}> & ISlug & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | {
        redirect: string | undefined;
    }>;
    editSlug: ({ data, new_password, }: {
        data: ISlug;
        new_password: string;
    }) => Promise<import("mongoose").UpdateWriteOpResult>;
};
export default _default;
//# sourceMappingURL=slug.service.d.ts.map