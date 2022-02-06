export interface Reddit {
	[key: string]: {
		kind: string;
		data: Data;
	};
}
export interface Data {
	after: null;
	dist: number;
	modhash: string;
	geo_filter: string;
	children: ChildrenEntity[];
	before: null;
}
export interface ChildrenEntity {
	kind: string;
	data: Data1;
}
export interface Data1 {
	approved_at_utc: null;
	subreddit: string;
	selftext: string;
	user_reports: null[];
	saved: boolean;
	mod_reason_title: null;
	gilded: number;
	clicked: boolean;
	title: string;
	link_flair_richtext: null[];
	subreddit_name_prefixed: string;
	hidden: boolean;
	pwls: number;
	link_flair_css_class: null;
	downs: number;
	thumbnail_height: number;
	top_awarded_type: null;
	parent_whitelist_status: string;
	hide_score: boolean;
	name: string;
	quarantine: boolean;
	link_flair_text_color: string;
	upvote_ratio: number;
	author_flair_background_color: string;
	subreddit_type: string;
	ups: number;
	total_awards_received: number;
	media_embed: VariantsOrMediaEmbedOrSecureMediaEmbedOrGildings;
	thumbnail_width: number;
	author_flair_template_id: string;
	is_original_content: boolean;
	author_fullname: string;
	secure_media: null;
	is_reddit_media_domain: boolean;
	is_meta: boolean;
	category: null;
	secure_media_embed: VariantsOrMediaEmbedOrSecureMediaEmbedOrGildings1;
	link_flair_text: null;
	can_mod_post: boolean;
	score: number;
	approved_by: null;
	is_created_from_ads_ui: boolean;
	author_premium: boolean;
	thumbnail: string;
	edited: boolean;
	author_flair_css_class: null;
	author_flair_richtext: AuthorFlairRichtextEntity[];
	gildings: VariantsOrMediaEmbedOrSecureMediaEmbedOrGildings2;
	post_hint: string;
	content_categories: null;
	is_self: boolean;
	mod_note: null;
	created: number;
	link_flair_type: string;
	wls: number;
	removed_by_category: null;
	banned_by: null;
	author_flair_type: string;
	domain: string;
	allow_live_comments: boolean;
	selftext_html: null;
	likes: null;
	suggested_sort: null;
	banned_at_utc: null;
	url_overridden_by_dest: string;
	view_count: null;
	archived: boolean;
	no_follow: boolean;
	is_crosspostable: boolean;
	pinned: boolean;
	over_18: boolean;
	preview: Preview;
	all_awardings: AllAwardingsEntity[];
	awarders: null[];
	media_only: boolean;
	can_gild: boolean;
	spoiler: boolean;
	locked: boolean;
	author_flair_text: string;
	treatment_tags: null[];
	visited: boolean;
	removed_by: null;
	num_reports: null;
	distinguished: null;
	subreddit_id: string;
	author_is_blocked: boolean;
	mod_reason_by: null;
	removal_reason: null;
	link_flair_background_color: string;
	id: string;
	is_robot_indexable: boolean;
	num_duplicates: number;
	report_reasons: null;
	author: string;
	discussion_type: null;
	num_comments: number;
	send_replies: boolean;
	media: null;
	contest_mode: boolean;
	author_patreon_flair: boolean;
	author_flair_text_color: string;
	permalink: string;
	whitelist_status: string;
	stickied: boolean;
	url: string;
	subreddit_subscribers: number;
	created_utc: number;
	num_crossposts: number;
	mod_reports: null[];
	is_video: boolean;
	comment_type: null;
	replies: Replies | string;
	collapsed_reason_code: null;
	parent_id: string;
	collapsed: boolean;
	body: string;
	is_submitter: boolean;
	body_html: string;
	collapsed_reason: null;
	associated_award: null;
	unrepliable_reason: null;
	score_hidden: boolean;
	link_id: string;
	controversiality: number;
	depth: number;
	collapsed_because_crowd_control: null;
}
export interface VariantsOrMediaEmbedOrSecureMediaEmbedOrGildings {}
export interface VariantsOrMediaEmbedOrSecureMediaEmbedOrGildings1 {}
export interface AuthorFlairRichtextEntity {
	a: string;
	u: string;
	e: string;
	t: string;
}
export interface VariantsOrMediaEmbedOrSecureMediaEmbedOrGildings2 {}
export interface Preview {
	images: ImagesEntity[];
	enabled: boolean;
}
export interface ImagesEntity {
	source: ResolutionsEntityOrSourceOrResizedIconsEntityOrResizedStaticIconsEntity;
	resolutions: ResolutionsEntityOrSourceOrResizedIconsEntityOrResizedStaticIconsEntity[];
	variants: VariantsOrMediaEmbedOrSecureMediaEmbedOrGildings2;
	id: string;
}
export interface ResolutionsEntityOrSourceOrResizedIconsEntityOrResizedStaticIconsEntity {
	url: string;
	width: number;
	height: number;
}
export interface AllAwardingsEntity {
	giver_coin_reward: null;
	subreddit_id: null;
	is_new: boolean;
	days_of_drip_extension: number;
	coin_price: number;
	id: string;
	penny_donate: null;
	coin_reward: number;
	icon_url: string;
	days_of_premium: number;
	icon_height: number;
	tiers_by_required_awardings: null;
	resized_icons: ResolutionsEntityOrSourceOrResizedIconsEntityOrResizedStaticIconsEntity[];
	icon_width: number;
	static_icon_width: number;
	start_date: null;
	is_enabled: boolean;
	awardings_required_to_grant_benefits: null;
	description: string;
	end_date: null;
	subreddit_coin_reward: number;
	count: number;
	static_icon_height: number;
	name: string;
	resized_static_icons: ResolutionsEntityOrSourceOrResizedIconsEntityOrResizedStaticIconsEntity[];
	icon_format: null;
	award_sub_type: string;
	penny_price: null;
	award_type: string;
	static_icon_url: string;
}
export interface Replies {
	kind: string;
	data: Data2;
}
export interface Data2 {
	after: null;
	dist: null;
	modhash: string;
	geo_filter: string;
	children: ChildrenEntity1[];
	before: null;
}
export interface ChildrenEntity1 {
	kind: string;
	data: Data3;
}
export interface Data3 {
	subreddit_id: string;
	approved_at_utc: null;
	author_is_blocked: boolean;
	comment_type: null;
	awarders: null[];
	mod_reason_by: null;
	banned_by: null;
	author_flair_type: string;
	total_awards_received: number;
	subreddit: string;
	author_flair_template_id: string;
	likes: null;
	replies: Replies1 | string;
	user_reports: null[];
	saved: boolean;
	id: string;
	banned_at_utc: null;
	mod_reason_title: null;
	gilded: number;
	archived: boolean;
	collapsed_reason_code: string;
	no_follow: boolean;
	author: string;
	can_mod_post: boolean;
	created_utc: number;
	send_replies: boolean;
	parent_id: string;
	score: number;
	author_fullname: string;
	removal_reason: null;
	approved_by: null;
	mod_note: null;
	all_awardings: null[];
	body: string;
	edited: boolean;
	top_awarded_type: null;
	author_flair_css_class: string;
	name: string;
	is_submitter: boolean;
	downs: number;
	author_flair_richtext: AuthorFlairRichtextEntity1[];
	author_patreon_flair: boolean;
	body_html: string;
	gildings: VariantsOrMediaEmbedOrSecureMediaEmbedOrGildings2;
	collapsed_reason: string;
	distinguished: null;
	associated_award: null;
	stickied: boolean;
	author_premium: boolean;
	can_gild: boolean;
	link_id: string;
	unrepliable_reason: null;
	author_flair_text_color: string;
	score_hidden: boolean;
	permalink: string;
	subreddit_type: string;
	locked: boolean;
	report_reasons: null;
	created: number;
	author_flair_text: string;
	treatment_tags: null[];
	collapsed: boolean;
	subreddit_name_prefixed: string;
	controversiality: number;
	depth: number;
	author_flair_background_color: string;
	collapsed_because_crowd_control: null;
	mod_reports: null[];
	num_reports: null;
	ups: number;
}
export interface Replies1 {
	kind: string;
	data: Data4;
}
export interface Data4 {
	after: null;
	dist: null;
	modhash: string;
	geo_filter: string;
	children: ChildrenEntity2[];
	before: null;
}
export interface ChildrenEntity2 {
	kind: string;
	data: Data5;
}
export interface Data5 {
	subreddit_id: string;
	approved_at_utc: null;
	author_is_blocked: boolean;
	comment_type: null;
	awarders: null[];
	mod_reason_by: null;
	banned_by: null;
	author_flair_type: string;
	total_awards_received: number;
	subreddit: string;
	author_flair_template_id: string;
	likes: null;
	replies: string;
	user_reports: null[];
	saved: boolean;
	id: string;
	banned_at_utc: null;
	mod_reason_title: null;
	gilded: number;
	archived: boolean;
	collapsed_reason_code: null;
	no_follow: boolean;
	author: string;
	can_mod_post: boolean;
	send_replies: boolean;
	parent_id: string;
	score: number;
	author_fullname: string;
	removal_reason: null;
	approved_by: null;
	mod_note: null;
	all_awardings: null[];
	body: string;
	edited: boolean;
	top_awarded_type: null;
	downs: number;
	author_flair_css_class: null;
	name: string;
	is_submitter: boolean;
	collapsed: boolean;
	author_flair_richtext: AuthorFlairRichtextEntity2[];
	author_patreon_flair: boolean;
	body_html: string;
	gildings: VariantsOrMediaEmbedOrSecureMediaEmbedOrGildings2;
	collapsed_reason: null;
	distinguished: null;
	associated_award: null;
	stickied: boolean;
	author_premium: boolean;
	can_gild: boolean;
	link_id: string;
	unrepliable_reason: null;
	author_flair_text_color: string;
	score_hidden: boolean;
	permalink: string;
	subreddit_type: string;
	locked: boolean;
	report_reasons: null;
	created: number;
	author_flair_text: string;
	treatment_tags: null[];
	created_utc: number;
	subreddit_name_prefixed: string;
	controversiality: number;
	depth: number;
	author_flair_background_color: string;
	collapsed_because_crowd_control: null;
	mod_reports: null[];
	num_reports: null;
	ups: number;
}
export interface AuthorFlairRichtextEntity2 {
	a: string;
	u: string;
	e: string;
	t: string;
}
export interface AuthorFlairRichtextEntity1 {
	e: string;
	t: string;
}
