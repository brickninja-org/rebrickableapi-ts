/**
 * Part (/api/v3/lego/set).
 *
 * @see https://rebrickable.com/api/v3/docs
 */
export interface Set {
  /** The set ID */
  set_num: string;

  /** The set name */
  name: string;

  /** The set year */
  year: number;

  /** The set theme ID */
  theme_id: number;

  /** The set number of parts */
  num_parts: number;

  /** The set image URL */
  set_img_url: string;

  /** The set instructions URL */
  set_url: string;

  /** The set last modified */
  last_modified_dt: string;
}
