/**
 * Color as returned from `/api/v3/lego/colors/`
 *
 * @see https://rebrickable.com/api/v3/docs/#!/lego/get_colors_list
 */
export interface Color {
  id: number;
  name: string;
  rgb: string;
  is_trans: boolean;
  external_ids: {
    [key: string]: {
      [key: string]: string;
    };
  };
}
