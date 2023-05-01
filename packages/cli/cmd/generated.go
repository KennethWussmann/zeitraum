// Code generated by github.com/Khan/genqlient, DO NOT EDIT.

package cmd

import (
	"context"
	"encoding/json"
	"time"

	"github.com/Khan/genqlient/graphql"
)

type CreateUpdateTimeSpan struct {
	Start time.Time  `json:"start"`
	End   *time.Time `json:"end"`
	Note  *string    `json:"note"`
	Tags  []string   `json:"tags"`
}

// GetStart returns CreateUpdateTimeSpan.Start, and is useful for accessing the field via an interface.
func (v *CreateUpdateTimeSpan) GetStart() time.Time { return v.Start }

// GetEnd returns CreateUpdateTimeSpan.End, and is useful for accessing the field via an interface.
func (v *CreateUpdateTimeSpan) GetEnd() *time.Time { return v.End }

// GetNote returns CreateUpdateTimeSpan.Note, and is useful for accessing the field via an interface.
func (v *CreateUpdateTimeSpan) GetNote() *string { return v.Note }

// GetTags returns CreateUpdateTimeSpan.Tags, and is useful for accessing the field via an interface.
func (v *CreateUpdateTimeSpan) GetTags() []string { return v.Tags }

// TagFragment includes the GraphQL fields of Tag requested by the fragment TagFragment.
type TagFragment struct {
	Id        string    `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Name      string    `json:"name"`
}

// GetId returns TagFragment.Id, and is useful for accessing the field via an interface.
func (v *TagFragment) GetId() string { return v.Id }

// GetCreatedAt returns TagFragment.CreatedAt, and is useful for accessing the field via an interface.
func (v *TagFragment) GetCreatedAt() time.Time { return v.CreatedAt }

// GetUpdatedAt returns TagFragment.UpdatedAt, and is useful for accessing the field via an interface.
func (v *TagFragment) GetUpdatedAt() time.Time { return v.UpdatedAt }

// GetName returns TagFragment.Name, and is useful for accessing the field via an interface.
func (v *TagFragment) GetName() string { return v.Name }

type TagSearch struct {
	Query  *string `json:"query"`
	Limit  *int    `json:"limit"`
	Offset *int    `json:"offset"`
}

// GetQuery returns TagSearch.Query, and is useful for accessing the field via an interface.
func (v *TagSearch) GetQuery() *string { return v.Query }

// GetLimit returns TagSearch.Limit, and is useful for accessing the field via an interface.
func (v *TagSearch) GetLimit() *int { return v.Limit }

// GetOffset returns TagSearch.Offset, and is useful for accessing the field via an interface.
func (v *TagSearch) GetOffset() *int { return v.Offset }

// import "../tag/tag.fragment.graphql"
type TimeSpanFragment struct {
	Id        string                     `json:"id"`
	CreatedAt time.Time                  `json:"createdAt"`
	UpdatedAt time.Time                  `json:"updatedAt"`
	Start     time.Time                  `json:"start"`
	End       *time.Time                 `json:"end"`
	Note      *string                    `json:"note"`
	Running   bool                       `json:"running"`
	Tags      []*TimeSpanFragmentTagsTag `json:"tags"`
}

// GetId returns TimeSpanFragment.Id, and is useful for accessing the field via an interface.
func (v *TimeSpanFragment) GetId() string { return v.Id }

// GetCreatedAt returns TimeSpanFragment.CreatedAt, and is useful for accessing the field via an interface.
func (v *TimeSpanFragment) GetCreatedAt() time.Time { return v.CreatedAt }

// GetUpdatedAt returns TimeSpanFragment.UpdatedAt, and is useful for accessing the field via an interface.
func (v *TimeSpanFragment) GetUpdatedAt() time.Time { return v.UpdatedAt }

// GetStart returns TimeSpanFragment.Start, and is useful for accessing the field via an interface.
func (v *TimeSpanFragment) GetStart() time.Time { return v.Start }

// GetEnd returns TimeSpanFragment.End, and is useful for accessing the field via an interface.
func (v *TimeSpanFragment) GetEnd() *time.Time { return v.End }

// GetNote returns TimeSpanFragment.Note, and is useful for accessing the field via an interface.
func (v *TimeSpanFragment) GetNote() *string { return v.Note }

// GetRunning returns TimeSpanFragment.Running, and is useful for accessing the field via an interface.
func (v *TimeSpanFragment) GetRunning() bool { return v.Running }

// GetTags returns TimeSpanFragment.Tags, and is useful for accessing the field via an interface.
func (v *TimeSpanFragment) GetTags() []*TimeSpanFragmentTagsTag { return v.Tags }

// TimeSpanFragmentTagsTag includes the requested fields of the GraphQL type Tag.
type TimeSpanFragmentTagsTag struct {
	TagFragment `json:"-"`
}

// GetId returns TimeSpanFragmentTagsTag.Id, and is useful for accessing the field via an interface.
func (v *TimeSpanFragmentTagsTag) GetId() string { return v.TagFragment.Id }

// GetCreatedAt returns TimeSpanFragmentTagsTag.CreatedAt, and is useful for accessing the field via an interface.
func (v *TimeSpanFragmentTagsTag) GetCreatedAt() time.Time { return v.TagFragment.CreatedAt }

// GetUpdatedAt returns TimeSpanFragmentTagsTag.UpdatedAt, and is useful for accessing the field via an interface.
func (v *TimeSpanFragmentTagsTag) GetUpdatedAt() time.Time { return v.TagFragment.UpdatedAt }

// GetName returns TimeSpanFragmentTagsTag.Name, and is useful for accessing the field via an interface.
func (v *TimeSpanFragmentTagsTag) GetName() string { return v.TagFragment.Name }

func (v *TimeSpanFragmentTagsTag) UnmarshalJSON(b []byte) error {

	if string(b) == "null" {
		return nil
	}

	var firstPass struct {
		*TimeSpanFragmentTagsTag
		graphql.NoUnmarshalJSON
	}
	firstPass.TimeSpanFragmentTagsTag = v

	err := json.Unmarshal(b, &firstPass)
	if err != nil {
		return err
	}

	err = json.Unmarshal(
		b, &v.TagFragment)
	if err != nil {
		return err
	}
	return nil
}

type __premarshalTimeSpanFragmentTagsTag struct {
	Id string `json:"id"`

	CreatedAt time.Time `json:"createdAt"`

	UpdatedAt time.Time `json:"updatedAt"`

	Name string `json:"name"`
}

func (v *TimeSpanFragmentTagsTag) MarshalJSON() ([]byte, error) {
	premarshaled, err := v.__premarshalJSON()
	if err != nil {
		return nil, err
	}
	return json.Marshal(premarshaled)
}

func (v *TimeSpanFragmentTagsTag) __premarshalJSON() (*__premarshalTimeSpanFragmentTagsTag, error) {
	var retval __premarshalTimeSpanFragmentTagsTag

	retval.Id = v.TagFragment.Id
	retval.CreatedAt = v.TagFragment.CreatedAt
	retval.UpdatedAt = v.TagFragment.UpdatedAt
	retval.Name = v.TagFragment.Name
	return &retval, nil
}

type TimeSpanSearch struct {
	FromInclusive *time.Time `json:"fromInclusive"`
	ToInclusive   *time.Time `json:"toInclusive"`
	Running       *bool      `json:"running"`
	Tags          []string   `json:"tags"`
	Limit         *int       `json:"limit"`
	Offset        *int       `json:"offset"`
}

// GetFromInclusive returns TimeSpanSearch.FromInclusive, and is useful for accessing the field via an interface.
func (v *TimeSpanSearch) GetFromInclusive() *time.Time { return v.FromInclusive }

// GetToInclusive returns TimeSpanSearch.ToInclusive, and is useful for accessing the field via an interface.
func (v *TimeSpanSearch) GetToInclusive() *time.Time { return v.ToInclusive }

// GetRunning returns TimeSpanSearch.Running, and is useful for accessing the field via an interface.
func (v *TimeSpanSearch) GetRunning() *bool { return v.Running }

// GetTags returns TimeSpanSearch.Tags, and is useful for accessing the field via an interface.
func (v *TimeSpanSearch) GetTags() []string { return v.Tags }

// GetLimit returns TimeSpanSearch.Limit, and is useful for accessing the field via an interface.
func (v *TimeSpanSearch) GetLimit() *int { return v.Limit }

// GetOffset returns TimeSpanSearch.Offset, and is useful for accessing the field via an interface.
func (v *TimeSpanSearch) GetOffset() *int { return v.Offset }

// __closeTimeSpanInput is used internally by genqlient
type __closeTimeSpanInput struct {
	Id  *string    `json:"id"`
	End *time.Time `json:"end"`
}

// GetId returns __closeTimeSpanInput.Id, and is useful for accessing the field via an interface.
func (v *__closeTimeSpanInput) GetId() *string { return v.Id }

// GetEnd returns __closeTimeSpanInput.End, and is useful for accessing the field via an interface.
func (v *__closeTimeSpanInput) GetEnd() *time.Time { return v.End }

// __createTimeSpanInput is used internally by genqlient
type __createTimeSpanInput struct {
	Input *CreateUpdateTimeSpan `json:"input,omitempty"`
}

// GetInput returns __createTimeSpanInput.Input, and is useful for accessing the field via an interface.
func (v *__createTimeSpanInput) GetInput() *CreateUpdateTimeSpan { return v.Input }

// __deleteTimeSpanInput is used internally by genqlient
type __deleteTimeSpanInput struct {
	Id string `json:"id"`
}

// GetId returns __deleteTimeSpanInput.Id, and is useful for accessing the field via an interface.
func (v *__deleteTimeSpanInput) GetId() string { return v.Id }

// __tagsInput is used internally by genqlient
type __tagsInput struct {
	Search *TagSearch `json:"search,omitempty"`
}

// GetSearch returns __tagsInput.Search, and is useful for accessing the field via an interface.
func (v *__tagsInput) GetSearch() *TagSearch { return v.Search }

// __timeSpanInput is used internally by genqlient
type __timeSpanInput struct {
	Id string `json:"id"`
}

// GetId returns __timeSpanInput.Id, and is useful for accessing the field via an interface.
func (v *__timeSpanInput) GetId() string { return v.Id }

// __timeSpansInput is used internally by genqlient
type __timeSpansInput struct {
	Search *TimeSpanSearch `json:"search,omitempty"`
}

// GetSearch returns __timeSpansInput.Search, and is useful for accessing the field via an interface.
func (v *__timeSpansInput) GetSearch() *TimeSpanSearch { return v.Search }

// __updateTimeSpanInput is used internally by genqlient
type __updateTimeSpanInput struct {
	Id    string                `json:"id"`
	Input *CreateUpdateTimeSpan `json:"input,omitempty"`
}

// GetId returns __updateTimeSpanInput.Id, and is useful for accessing the field via an interface.
func (v *__updateTimeSpanInput) GetId() string { return v.Id }

// GetInput returns __updateTimeSpanInput.Input, and is useful for accessing the field via an interface.
func (v *__updateTimeSpanInput) GetInput() *CreateUpdateTimeSpan { return v.Input }

// closeTimeSpanCloseTimeSpan includes the requested fields of the GraphQL type TimeSpan.
type closeTimeSpanCloseTimeSpan struct {
	TimeSpanFragment `json:"-"`
}

// GetId returns closeTimeSpanCloseTimeSpan.Id, and is useful for accessing the field via an interface.
func (v *closeTimeSpanCloseTimeSpan) GetId() string { return v.TimeSpanFragment.Id }

// GetCreatedAt returns closeTimeSpanCloseTimeSpan.CreatedAt, and is useful for accessing the field via an interface.
func (v *closeTimeSpanCloseTimeSpan) GetCreatedAt() time.Time { return v.TimeSpanFragment.CreatedAt }

// GetUpdatedAt returns closeTimeSpanCloseTimeSpan.UpdatedAt, and is useful for accessing the field via an interface.
func (v *closeTimeSpanCloseTimeSpan) GetUpdatedAt() time.Time { return v.TimeSpanFragment.UpdatedAt }

// GetStart returns closeTimeSpanCloseTimeSpan.Start, and is useful for accessing the field via an interface.
func (v *closeTimeSpanCloseTimeSpan) GetStart() time.Time { return v.TimeSpanFragment.Start }

// GetEnd returns closeTimeSpanCloseTimeSpan.End, and is useful for accessing the field via an interface.
func (v *closeTimeSpanCloseTimeSpan) GetEnd() *time.Time { return v.TimeSpanFragment.End }

// GetNote returns closeTimeSpanCloseTimeSpan.Note, and is useful for accessing the field via an interface.
func (v *closeTimeSpanCloseTimeSpan) GetNote() *string { return v.TimeSpanFragment.Note }

// GetRunning returns closeTimeSpanCloseTimeSpan.Running, and is useful for accessing the field via an interface.
func (v *closeTimeSpanCloseTimeSpan) GetRunning() bool { return v.TimeSpanFragment.Running }

// GetTags returns closeTimeSpanCloseTimeSpan.Tags, and is useful for accessing the field via an interface.
func (v *closeTimeSpanCloseTimeSpan) GetTags() []*TimeSpanFragmentTagsTag {
	return v.TimeSpanFragment.Tags
}

func (v *closeTimeSpanCloseTimeSpan) UnmarshalJSON(b []byte) error {

	if string(b) == "null" {
		return nil
	}

	var firstPass struct {
		*closeTimeSpanCloseTimeSpan
		graphql.NoUnmarshalJSON
	}
	firstPass.closeTimeSpanCloseTimeSpan = v

	err := json.Unmarshal(b, &firstPass)
	if err != nil {
		return err
	}

	err = json.Unmarshal(
		b, &v.TimeSpanFragment)
	if err != nil {
		return err
	}
	return nil
}

type __premarshalcloseTimeSpanCloseTimeSpan struct {
	Id string `json:"id"`

	CreatedAt time.Time `json:"createdAt"`

	UpdatedAt time.Time `json:"updatedAt"`

	Start time.Time `json:"start"`

	End *time.Time `json:"end"`

	Note *string `json:"note"`

	Running bool `json:"running"`

	Tags []*TimeSpanFragmentTagsTag `json:"tags"`
}

func (v *closeTimeSpanCloseTimeSpan) MarshalJSON() ([]byte, error) {
	premarshaled, err := v.__premarshalJSON()
	if err != nil {
		return nil, err
	}
	return json.Marshal(premarshaled)
}

func (v *closeTimeSpanCloseTimeSpan) __premarshalJSON() (*__premarshalcloseTimeSpanCloseTimeSpan, error) {
	var retval __premarshalcloseTimeSpanCloseTimeSpan

	retval.Id = v.TimeSpanFragment.Id
	retval.CreatedAt = v.TimeSpanFragment.CreatedAt
	retval.UpdatedAt = v.TimeSpanFragment.UpdatedAt
	retval.Start = v.TimeSpanFragment.Start
	retval.End = v.TimeSpanFragment.End
	retval.Note = v.TimeSpanFragment.Note
	retval.Running = v.TimeSpanFragment.Running
	retval.Tags = v.TimeSpanFragment.Tags
	return &retval, nil
}

// closeTimeSpanResponse is returned by closeTimeSpan on success.
type closeTimeSpanResponse struct {
	// Close a time span that does not have an end time yet.
	// When invoked without id it will close the time span that is running longest.
	// Optionally you can provide an end time to close the time span at a specific time.
	CloseTimeSpan *closeTimeSpanCloseTimeSpan `json:"closeTimeSpan"`
}

// GetCloseTimeSpan returns closeTimeSpanResponse.CloseTimeSpan, and is useful for accessing the field via an interface.
func (v *closeTimeSpanResponse) GetCloseTimeSpan() *closeTimeSpanCloseTimeSpan {
	return v.CloseTimeSpan
}

// createTimeSpanCreateTimeSpan includes the requested fields of the GraphQL type TimeSpan.
type createTimeSpanCreateTimeSpan struct {
	TimeSpanFragment `json:"-"`
}

// GetId returns createTimeSpanCreateTimeSpan.Id, and is useful for accessing the field via an interface.
func (v *createTimeSpanCreateTimeSpan) GetId() string { return v.TimeSpanFragment.Id }

// GetCreatedAt returns createTimeSpanCreateTimeSpan.CreatedAt, and is useful for accessing the field via an interface.
func (v *createTimeSpanCreateTimeSpan) GetCreatedAt() time.Time { return v.TimeSpanFragment.CreatedAt }

// GetUpdatedAt returns createTimeSpanCreateTimeSpan.UpdatedAt, and is useful for accessing the field via an interface.
func (v *createTimeSpanCreateTimeSpan) GetUpdatedAt() time.Time { return v.TimeSpanFragment.UpdatedAt }

// GetStart returns createTimeSpanCreateTimeSpan.Start, and is useful for accessing the field via an interface.
func (v *createTimeSpanCreateTimeSpan) GetStart() time.Time { return v.TimeSpanFragment.Start }

// GetEnd returns createTimeSpanCreateTimeSpan.End, and is useful for accessing the field via an interface.
func (v *createTimeSpanCreateTimeSpan) GetEnd() *time.Time { return v.TimeSpanFragment.End }

// GetNote returns createTimeSpanCreateTimeSpan.Note, and is useful for accessing the field via an interface.
func (v *createTimeSpanCreateTimeSpan) GetNote() *string { return v.TimeSpanFragment.Note }

// GetRunning returns createTimeSpanCreateTimeSpan.Running, and is useful for accessing the field via an interface.
func (v *createTimeSpanCreateTimeSpan) GetRunning() bool { return v.TimeSpanFragment.Running }

// GetTags returns createTimeSpanCreateTimeSpan.Tags, and is useful for accessing the field via an interface.
func (v *createTimeSpanCreateTimeSpan) GetTags() []*TimeSpanFragmentTagsTag {
	return v.TimeSpanFragment.Tags
}

func (v *createTimeSpanCreateTimeSpan) UnmarshalJSON(b []byte) error {

	if string(b) == "null" {
		return nil
	}

	var firstPass struct {
		*createTimeSpanCreateTimeSpan
		graphql.NoUnmarshalJSON
	}
	firstPass.createTimeSpanCreateTimeSpan = v

	err := json.Unmarshal(b, &firstPass)
	if err != nil {
		return err
	}

	err = json.Unmarshal(
		b, &v.TimeSpanFragment)
	if err != nil {
		return err
	}
	return nil
}

type __premarshalcreateTimeSpanCreateTimeSpan struct {
	Id string `json:"id"`

	CreatedAt time.Time `json:"createdAt"`

	UpdatedAt time.Time `json:"updatedAt"`

	Start time.Time `json:"start"`

	End *time.Time `json:"end"`

	Note *string `json:"note"`

	Running bool `json:"running"`

	Tags []*TimeSpanFragmentTagsTag `json:"tags"`
}

func (v *createTimeSpanCreateTimeSpan) MarshalJSON() ([]byte, error) {
	premarshaled, err := v.__premarshalJSON()
	if err != nil {
		return nil, err
	}
	return json.Marshal(premarshaled)
}

func (v *createTimeSpanCreateTimeSpan) __premarshalJSON() (*__premarshalcreateTimeSpanCreateTimeSpan, error) {
	var retval __premarshalcreateTimeSpanCreateTimeSpan

	retval.Id = v.TimeSpanFragment.Id
	retval.CreatedAt = v.TimeSpanFragment.CreatedAt
	retval.UpdatedAt = v.TimeSpanFragment.UpdatedAt
	retval.Start = v.TimeSpanFragment.Start
	retval.End = v.TimeSpanFragment.End
	retval.Note = v.TimeSpanFragment.Note
	retval.Running = v.TimeSpanFragment.Running
	retval.Tags = v.TimeSpanFragment.Tags
	return &retval, nil
}

// createTimeSpanResponse is returned by createTimeSpan on success.
type createTimeSpanResponse struct {
	CreateTimeSpan *createTimeSpanCreateTimeSpan `json:"createTimeSpan"`
}

// GetCreateTimeSpan returns createTimeSpanResponse.CreateTimeSpan, and is useful for accessing the field via an interface.
func (v *createTimeSpanResponse) GetCreateTimeSpan() *createTimeSpanCreateTimeSpan {
	return v.CreateTimeSpan
}

// deleteTimeSpanResponse is returned by deleteTimeSpan on success.
type deleteTimeSpanResponse struct {
	DeleteTimeSpan bool `json:"deleteTimeSpan"`
}

// GetDeleteTimeSpan returns deleteTimeSpanResponse.DeleteTimeSpan, and is useful for accessing the field via an interface.
func (v *deleteTimeSpanResponse) GetDeleteTimeSpan() bool { return v.DeleteTimeSpan }

// meMeUser includes the requested fields of the GraphQL type User.
type meMeUser struct {
	Id        string    `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Username  string    `json:"username"`
}

// GetId returns meMeUser.Id, and is useful for accessing the field via an interface.
func (v *meMeUser) GetId() string { return v.Id }

// GetCreatedAt returns meMeUser.CreatedAt, and is useful for accessing the field via an interface.
func (v *meMeUser) GetCreatedAt() time.Time { return v.CreatedAt }

// GetUpdatedAt returns meMeUser.UpdatedAt, and is useful for accessing the field via an interface.
func (v *meMeUser) GetUpdatedAt() time.Time { return v.UpdatedAt }

// GetUsername returns meMeUser.Username, and is useful for accessing the field via an interface.
func (v *meMeUser) GetUsername() string { return v.Username }

// meResponse is returned by me on success.
type meResponse struct {
	Me *meMeUser `json:"me"`
}

// GetMe returns meResponse.Me, and is useful for accessing the field via an interface.
func (v *meResponse) GetMe() *meMeUser { return v.Me }

// tagsResponse is returned by tags on success.
type tagsResponse struct {
	Tags *tagsTagsTagList `json:"tags"`
}

// GetTags returns tagsResponse.Tags, and is useful for accessing the field via an interface.
func (v *tagsResponse) GetTags() *tagsTagsTagList { return v.Tags }

// tagsTagsTagList includes the requested fields of the GraphQL type TagList.
type tagsTagsTagList struct {
	Total int                        `json:"total"`
	Items []*tagsTagsTagListItemsTag `json:"items"`
}

// GetTotal returns tagsTagsTagList.Total, and is useful for accessing the field via an interface.
func (v *tagsTagsTagList) GetTotal() int { return v.Total }

// GetItems returns tagsTagsTagList.Items, and is useful for accessing the field via an interface.
func (v *tagsTagsTagList) GetItems() []*tagsTagsTagListItemsTag { return v.Items }

// tagsTagsTagListItemsTag includes the requested fields of the GraphQL type Tag.
type tagsTagsTagListItemsTag struct {
	TagFragment `json:"-"`
}

// GetId returns tagsTagsTagListItemsTag.Id, and is useful for accessing the field via an interface.
func (v *tagsTagsTagListItemsTag) GetId() string { return v.TagFragment.Id }

// GetCreatedAt returns tagsTagsTagListItemsTag.CreatedAt, and is useful for accessing the field via an interface.
func (v *tagsTagsTagListItemsTag) GetCreatedAt() time.Time { return v.TagFragment.CreatedAt }

// GetUpdatedAt returns tagsTagsTagListItemsTag.UpdatedAt, and is useful for accessing the field via an interface.
func (v *tagsTagsTagListItemsTag) GetUpdatedAt() time.Time { return v.TagFragment.UpdatedAt }

// GetName returns tagsTagsTagListItemsTag.Name, and is useful for accessing the field via an interface.
func (v *tagsTagsTagListItemsTag) GetName() string { return v.TagFragment.Name }

func (v *tagsTagsTagListItemsTag) UnmarshalJSON(b []byte) error {

	if string(b) == "null" {
		return nil
	}

	var firstPass struct {
		*tagsTagsTagListItemsTag
		graphql.NoUnmarshalJSON
	}
	firstPass.tagsTagsTagListItemsTag = v

	err := json.Unmarshal(b, &firstPass)
	if err != nil {
		return err
	}

	err = json.Unmarshal(
		b, &v.TagFragment)
	if err != nil {
		return err
	}
	return nil
}

type __premarshaltagsTagsTagListItemsTag struct {
	Id string `json:"id"`

	CreatedAt time.Time `json:"createdAt"`

	UpdatedAt time.Time `json:"updatedAt"`

	Name string `json:"name"`
}

func (v *tagsTagsTagListItemsTag) MarshalJSON() ([]byte, error) {
	premarshaled, err := v.__premarshalJSON()
	if err != nil {
		return nil, err
	}
	return json.Marshal(premarshaled)
}

func (v *tagsTagsTagListItemsTag) __premarshalJSON() (*__premarshaltagsTagsTagListItemsTag, error) {
	var retval __premarshaltagsTagsTagListItemsTag

	retval.Id = v.TagFragment.Id
	retval.CreatedAt = v.TagFragment.CreatedAt
	retval.UpdatedAt = v.TagFragment.UpdatedAt
	retval.Name = v.TagFragment.Name
	return &retval, nil
}

// timeSpanResponse is returned by timeSpan on success.
type timeSpanResponse struct {
	TimeSpan *timeSpanTimeSpan `json:"timeSpan"`
}

// GetTimeSpan returns timeSpanResponse.TimeSpan, and is useful for accessing the field via an interface.
func (v *timeSpanResponse) GetTimeSpan() *timeSpanTimeSpan { return v.TimeSpan }

// timeSpanTimeSpan includes the requested fields of the GraphQL type TimeSpan.
type timeSpanTimeSpan struct {
	TimeSpanFragment `json:"-"`
}

// GetId returns timeSpanTimeSpan.Id, and is useful for accessing the field via an interface.
func (v *timeSpanTimeSpan) GetId() string { return v.TimeSpanFragment.Id }

// GetCreatedAt returns timeSpanTimeSpan.CreatedAt, and is useful for accessing the field via an interface.
func (v *timeSpanTimeSpan) GetCreatedAt() time.Time { return v.TimeSpanFragment.CreatedAt }

// GetUpdatedAt returns timeSpanTimeSpan.UpdatedAt, and is useful for accessing the field via an interface.
func (v *timeSpanTimeSpan) GetUpdatedAt() time.Time { return v.TimeSpanFragment.UpdatedAt }

// GetStart returns timeSpanTimeSpan.Start, and is useful for accessing the field via an interface.
func (v *timeSpanTimeSpan) GetStart() time.Time { return v.TimeSpanFragment.Start }

// GetEnd returns timeSpanTimeSpan.End, and is useful for accessing the field via an interface.
func (v *timeSpanTimeSpan) GetEnd() *time.Time { return v.TimeSpanFragment.End }

// GetNote returns timeSpanTimeSpan.Note, and is useful for accessing the field via an interface.
func (v *timeSpanTimeSpan) GetNote() *string { return v.TimeSpanFragment.Note }

// GetRunning returns timeSpanTimeSpan.Running, and is useful for accessing the field via an interface.
func (v *timeSpanTimeSpan) GetRunning() bool { return v.TimeSpanFragment.Running }

// GetTags returns timeSpanTimeSpan.Tags, and is useful for accessing the field via an interface.
func (v *timeSpanTimeSpan) GetTags() []*TimeSpanFragmentTagsTag { return v.TimeSpanFragment.Tags }

func (v *timeSpanTimeSpan) UnmarshalJSON(b []byte) error {

	if string(b) == "null" {
		return nil
	}

	var firstPass struct {
		*timeSpanTimeSpan
		graphql.NoUnmarshalJSON
	}
	firstPass.timeSpanTimeSpan = v

	err := json.Unmarshal(b, &firstPass)
	if err != nil {
		return err
	}

	err = json.Unmarshal(
		b, &v.TimeSpanFragment)
	if err != nil {
		return err
	}
	return nil
}

type __premarshaltimeSpanTimeSpan struct {
	Id string `json:"id"`

	CreatedAt time.Time `json:"createdAt"`

	UpdatedAt time.Time `json:"updatedAt"`

	Start time.Time `json:"start"`

	End *time.Time `json:"end"`

	Note *string `json:"note"`

	Running bool `json:"running"`

	Tags []*TimeSpanFragmentTagsTag `json:"tags"`
}

func (v *timeSpanTimeSpan) MarshalJSON() ([]byte, error) {
	premarshaled, err := v.__premarshalJSON()
	if err != nil {
		return nil, err
	}
	return json.Marshal(premarshaled)
}

func (v *timeSpanTimeSpan) __premarshalJSON() (*__premarshaltimeSpanTimeSpan, error) {
	var retval __premarshaltimeSpanTimeSpan

	retval.Id = v.TimeSpanFragment.Id
	retval.CreatedAt = v.TimeSpanFragment.CreatedAt
	retval.UpdatedAt = v.TimeSpanFragment.UpdatedAt
	retval.Start = v.TimeSpanFragment.Start
	retval.End = v.TimeSpanFragment.End
	retval.Note = v.TimeSpanFragment.Note
	retval.Running = v.TimeSpanFragment.Running
	retval.Tags = v.TimeSpanFragment.Tags
	return &retval, nil
}

// timeSpansResponse is returned by timeSpans on success.
type timeSpansResponse struct {
	TimeSpans *timeSpansTimeSpansTimeSpanList `json:"timeSpans"`
}

// GetTimeSpans returns timeSpansResponse.TimeSpans, and is useful for accessing the field via an interface.
func (v *timeSpansResponse) GetTimeSpans() *timeSpansTimeSpansTimeSpanList { return v.TimeSpans }

// timeSpansTimeSpansTimeSpanList includes the requested fields of the GraphQL type TimeSpanList.
type timeSpansTimeSpansTimeSpanList struct {
	Total int                                            `json:"total"`
	Items []*timeSpansTimeSpansTimeSpanListItemsTimeSpan `json:"items"`
}

// GetTotal returns timeSpansTimeSpansTimeSpanList.Total, and is useful for accessing the field via an interface.
func (v *timeSpansTimeSpansTimeSpanList) GetTotal() int { return v.Total }

// GetItems returns timeSpansTimeSpansTimeSpanList.Items, and is useful for accessing the field via an interface.
func (v *timeSpansTimeSpansTimeSpanList) GetItems() []*timeSpansTimeSpansTimeSpanListItemsTimeSpan {
	return v.Items
}

// timeSpansTimeSpansTimeSpanListItemsTimeSpan includes the requested fields of the GraphQL type TimeSpan.
type timeSpansTimeSpansTimeSpanListItemsTimeSpan struct {
	TimeSpanFragment `json:"-"`
}

// GetId returns timeSpansTimeSpansTimeSpanListItemsTimeSpan.Id, and is useful for accessing the field via an interface.
func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) GetId() string { return v.TimeSpanFragment.Id }

// GetCreatedAt returns timeSpansTimeSpansTimeSpanListItemsTimeSpan.CreatedAt, and is useful for accessing the field via an interface.
func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) GetCreatedAt() time.Time {
	return v.TimeSpanFragment.CreatedAt
}

// GetUpdatedAt returns timeSpansTimeSpansTimeSpanListItemsTimeSpan.UpdatedAt, and is useful for accessing the field via an interface.
func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) GetUpdatedAt() time.Time {
	return v.TimeSpanFragment.UpdatedAt
}

// GetStart returns timeSpansTimeSpansTimeSpanListItemsTimeSpan.Start, and is useful for accessing the field via an interface.
func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) GetStart() time.Time {
	return v.TimeSpanFragment.Start
}

// GetEnd returns timeSpansTimeSpansTimeSpanListItemsTimeSpan.End, and is useful for accessing the field via an interface.
func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) GetEnd() *time.Time {
	return v.TimeSpanFragment.End
}

// GetNote returns timeSpansTimeSpansTimeSpanListItemsTimeSpan.Note, and is useful for accessing the field via an interface.
func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) GetNote() *string {
	return v.TimeSpanFragment.Note
}

// GetRunning returns timeSpansTimeSpansTimeSpanListItemsTimeSpan.Running, and is useful for accessing the field via an interface.
func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) GetRunning() bool {
	return v.TimeSpanFragment.Running
}

// GetTags returns timeSpansTimeSpansTimeSpanListItemsTimeSpan.Tags, and is useful for accessing the field via an interface.
func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) GetTags() []*TimeSpanFragmentTagsTag {
	return v.TimeSpanFragment.Tags
}

func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) UnmarshalJSON(b []byte) error {

	if string(b) == "null" {
		return nil
	}

	var firstPass struct {
		*timeSpansTimeSpansTimeSpanListItemsTimeSpan
		graphql.NoUnmarshalJSON
	}
	firstPass.timeSpansTimeSpansTimeSpanListItemsTimeSpan = v

	err := json.Unmarshal(b, &firstPass)
	if err != nil {
		return err
	}

	err = json.Unmarshal(
		b, &v.TimeSpanFragment)
	if err != nil {
		return err
	}
	return nil
}

type __premarshaltimeSpansTimeSpansTimeSpanListItemsTimeSpan struct {
	Id string `json:"id"`

	CreatedAt time.Time `json:"createdAt"`

	UpdatedAt time.Time `json:"updatedAt"`

	Start time.Time `json:"start"`

	End *time.Time `json:"end"`

	Note *string `json:"note"`

	Running bool `json:"running"`

	Tags []*TimeSpanFragmentTagsTag `json:"tags"`
}

func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) MarshalJSON() ([]byte, error) {
	premarshaled, err := v.__premarshalJSON()
	if err != nil {
		return nil, err
	}
	return json.Marshal(premarshaled)
}

func (v *timeSpansTimeSpansTimeSpanListItemsTimeSpan) __premarshalJSON() (*__premarshaltimeSpansTimeSpansTimeSpanListItemsTimeSpan, error) {
	var retval __premarshaltimeSpansTimeSpansTimeSpanListItemsTimeSpan

	retval.Id = v.TimeSpanFragment.Id
	retval.CreatedAt = v.TimeSpanFragment.CreatedAt
	retval.UpdatedAt = v.TimeSpanFragment.UpdatedAt
	retval.Start = v.TimeSpanFragment.Start
	retval.End = v.TimeSpanFragment.End
	retval.Note = v.TimeSpanFragment.Note
	retval.Running = v.TimeSpanFragment.Running
	retval.Tags = v.TimeSpanFragment.Tags
	return &retval, nil
}

// updateTimeSpanResponse is returned by updateTimeSpan on success.
type updateTimeSpanResponse struct {
	UpdateTimeSpan *updateTimeSpanUpdateTimeSpan `json:"updateTimeSpan"`
}

// GetUpdateTimeSpan returns updateTimeSpanResponse.UpdateTimeSpan, and is useful for accessing the field via an interface.
func (v *updateTimeSpanResponse) GetUpdateTimeSpan() *updateTimeSpanUpdateTimeSpan {
	return v.UpdateTimeSpan
}

// updateTimeSpanUpdateTimeSpan includes the requested fields of the GraphQL type TimeSpan.
type updateTimeSpanUpdateTimeSpan struct {
	TimeSpanFragment `json:"-"`
}

// GetId returns updateTimeSpanUpdateTimeSpan.Id, and is useful for accessing the field via an interface.
func (v *updateTimeSpanUpdateTimeSpan) GetId() string { return v.TimeSpanFragment.Id }

// GetCreatedAt returns updateTimeSpanUpdateTimeSpan.CreatedAt, and is useful for accessing the field via an interface.
func (v *updateTimeSpanUpdateTimeSpan) GetCreatedAt() time.Time { return v.TimeSpanFragment.CreatedAt }

// GetUpdatedAt returns updateTimeSpanUpdateTimeSpan.UpdatedAt, and is useful for accessing the field via an interface.
func (v *updateTimeSpanUpdateTimeSpan) GetUpdatedAt() time.Time { return v.TimeSpanFragment.UpdatedAt }

// GetStart returns updateTimeSpanUpdateTimeSpan.Start, and is useful for accessing the field via an interface.
func (v *updateTimeSpanUpdateTimeSpan) GetStart() time.Time { return v.TimeSpanFragment.Start }

// GetEnd returns updateTimeSpanUpdateTimeSpan.End, and is useful for accessing the field via an interface.
func (v *updateTimeSpanUpdateTimeSpan) GetEnd() *time.Time { return v.TimeSpanFragment.End }

// GetNote returns updateTimeSpanUpdateTimeSpan.Note, and is useful for accessing the field via an interface.
func (v *updateTimeSpanUpdateTimeSpan) GetNote() *string { return v.TimeSpanFragment.Note }

// GetRunning returns updateTimeSpanUpdateTimeSpan.Running, and is useful for accessing the field via an interface.
func (v *updateTimeSpanUpdateTimeSpan) GetRunning() bool { return v.TimeSpanFragment.Running }

// GetTags returns updateTimeSpanUpdateTimeSpan.Tags, and is useful for accessing the field via an interface.
func (v *updateTimeSpanUpdateTimeSpan) GetTags() []*TimeSpanFragmentTagsTag {
	return v.TimeSpanFragment.Tags
}

func (v *updateTimeSpanUpdateTimeSpan) UnmarshalJSON(b []byte) error {

	if string(b) == "null" {
		return nil
	}

	var firstPass struct {
		*updateTimeSpanUpdateTimeSpan
		graphql.NoUnmarshalJSON
	}
	firstPass.updateTimeSpanUpdateTimeSpan = v

	err := json.Unmarshal(b, &firstPass)
	if err != nil {
		return err
	}

	err = json.Unmarshal(
		b, &v.TimeSpanFragment)
	if err != nil {
		return err
	}
	return nil
}

type __premarshalupdateTimeSpanUpdateTimeSpan struct {
	Id string `json:"id"`

	CreatedAt time.Time `json:"createdAt"`

	UpdatedAt time.Time `json:"updatedAt"`

	Start time.Time `json:"start"`

	End *time.Time `json:"end"`

	Note *string `json:"note"`

	Running bool `json:"running"`

	Tags []*TimeSpanFragmentTagsTag `json:"tags"`
}

func (v *updateTimeSpanUpdateTimeSpan) MarshalJSON() ([]byte, error) {
	premarshaled, err := v.__premarshalJSON()
	if err != nil {
		return nil, err
	}
	return json.Marshal(premarshaled)
}

func (v *updateTimeSpanUpdateTimeSpan) __premarshalJSON() (*__premarshalupdateTimeSpanUpdateTimeSpan, error) {
	var retval __premarshalupdateTimeSpanUpdateTimeSpan

	retval.Id = v.TimeSpanFragment.Id
	retval.CreatedAt = v.TimeSpanFragment.CreatedAt
	retval.UpdatedAt = v.TimeSpanFragment.UpdatedAt
	retval.Start = v.TimeSpanFragment.Start
	retval.End = v.TimeSpanFragment.End
	retval.Note = v.TimeSpanFragment.Note
	retval.Running = v.TimeSpanFragment.Running
	retval.Tags = v.TimeSpanFragment.Tags
	return &retval, nil
}

// versionResponse is returned by version on success.
type versionResponse struct {
	// Software version of the server.
	Version string `json:"version"`
}

// GetVersion returns versionResponse.Version, and is useful for accessing the field via an interface.
func (v *versionResponse) GetVersion() string { return v.Version }

// import "./timeSpan.fragment.graphql"
func closeTimeSpan(
	ctx context.Context,
	client graphql.Client,
	id *string,
	end *time.Time,
) (*closeTimeSpanResponse, error) {
	req := &graphql.Request{
		OpName: "closeTimeSpan",
		Query: `
mutation closeTimeSpan ($id: ID, $end: DateTime) {
	closeTimeSpan(id: $id, end: $end) {
		... TimeSpanFragment
	}
}
fragment TimeSpanFragment on TimeSpan {
	id
	createdAt
	updatedAt
	start
	end
	note
	running
	tags {
		... TagFragment
	}
}
fragment TagFragment on Tag {
	id
	createdAt
	updatedAt
	name
}
`,
		Variables: &__closeTimeSpanInput{
			Id:  id,
			End: end,
		},
	}
	var err error

	var data closeTimeSpanResponse
	resp := &graphql.Response{Data: &data}

	err = client.MakeRequest(
		ctx,
		req,
		resp,
	)

	return &data, err
}

// import "./timeSpan.fragment.graphql"
func createTimeSpan(
	ctx context.Context,
	client graphql.Client,
	input *CreateUpdateTimeSpan,
) (*createTimeSpanResponse, error) {
	req := &graphql.Request{
		OpName: "createTimeSpan",
		Query: `
mutation createTimeSpan ($input: CreateUpdateTimeSpan!) {
	createTimeSpan(input: $input) {
		... TimeSpanFragment
	}
}
fragment TimeSpanFragment on TimeSpan {
	id
	createdAt
	updatedAt
	start
	end
	note
	running
	tags {
		... TagFragment
	}
}
fragment TagFragment on Tag {
	id
	createdAt
	updatedAt
	name
}
`,
		Variables: &__createTimeSpanInput{
			Input: input,
		},
	}
	var err error

	var data createTimeSpanResponse
	resp := &graphql.Response{Data: &data}

	err = client.MakeRequest(
		ctx,
		req,
		resp,
	)

	return &data, err
}

func deleteTimeSpan(
	ctx context.Context,
	client graphql.Client,
	id string,
) (*deleteTimeSpanResponse, error) {
	req := &graphql.Request{
		OpName: "deleteTimeSpan",
		Query: `
mutation deleteTimeSpan ($id: ID!) {
	deleteTimeSpan(id: $id)
}
`,
		Variables: &__deleteTimeSpanInput{
			Id: id,
		},
	}
	var err error

	var data deleteTimeSpanResponse
	resp := &graphql.Response{Data: &data}

	err = client.MakeRequest(
		ctx,
		req,
		resp,
	)

	return &data, err
}

func me(
	ctx context.Context,
	client graphql.Client,
) (*meResponse, error) {
	req := &graphql.Request{
		OpName: "me",
		Query: `
query me {
	me {
		id
		createdAt
		updatedAt
		username
	}
}
`,
	}
	var err error

	var data meResponse
	resp := &graphql.Response{Data: &data}

	err = client.MakeRequest(
		ctx,
		req,
		resp,
	)

	return &data, err
}

// import "./tag.fragment.graphql"
func tags(
	ctx context.Context,
	client graphql.Client,
	search *TagSearch,
) (*tagsResponse, error) {
	req := &graphql.Request{
		OpName: "tags",
		Query: `
query tags ($search: TagSearch) {
	tags(input: $search) {
		total
		items {
			... TagFragment
		}
	}
}
fragment TagFragment on Tag {
	id
	createdAt
	updatedAt
	name
}
`,
		Variables: &__tagsInput{
			Search: search,
		},
	}
	var err error

	var data tagsResponse
	resp := &graphql.Response{Data: &data}

	err = client.MakeRequest(
		ctx,
		req,
		resp,
	)

	return &data, err
}

// import "./timeSpan.fragment.graphql"
func timeSpan(
	ctx context.Context,
	client graphql.Client,
	id string,
) (*timeSpanResponse, error) {
	req := &graphql.Request{
		OpName: "timeSpan",
		Query: `
query timeSpan ($id: ID!) {
	timeSpan(id: $id) {
		... TimeSpanFragment
	}
}
fragment TimeSpanFragment on TimeSpan {
	id
	createdAt
	updatedAt
	start
	end
	note
	running
	tags {
		... TagFragment
	}
}
fragment TagFragment on Tag {
	id
	createdAt
	updatedAt
	name
}
`,
		Variables: &__timeSpanInput{
			Id: id,
		},
	}
	var err error

	var data timeSpanResponse
	resp := &graphql.Response{Data: &data}

	err = client.MakeRequest(
		ctx,
		req,
		resp,
	)

	return &data, err
}

// import "./timeSpan.fragment.graphql"
func timeSpans(
	ctx context.Context,
	client graphql.Client,
	search *TimeSpanSearch,
) (*timeSpansResponse, error) {
	req := &graphql.Request{
		OpName: "timeSpans",
		Query: `
query timeSpans ($search: TimeSpanSearch) {
	timeSpans(input: $search) {
		total
		items {
			... TimeSpanFragment
		}
	}
}
fragment TimeSpanFragment on TimeSpan {
	id
	createdAt
	updatedAt
	start
	end
	note
	running
	tags {
		... TagFragment
	}
}
fragment TagFragment on Tag {
	id
	createdAt
	updatedAt
	name
}
`,
		Variables: &__timeSpansInput{
			Search: search,
		},
	}
	var err error

	var data timeSpansResponse
	resp := &graphql.Response{Data: &data}

	err = client.MakeRequest(
		ctx,
		req,
		resp,
	)

	return &data, err
}

// import "./timeSpan.fragment.graphql"
func updateTimeSpan(
	ctx context.Context,
	client graphql.Client,
	id string,
	input *CreateUpdateTimeSpan,
) (*updateTimeSpanResponse, error) {
	req := &graphql.Request{
		OpName: "updateTimeSpan",
		Query: `
mutation updateTimeSpan ($id: ID!, $input: CreateUpdateTimeSpan!) {
	updateTimeSpan(id: $id, input: $input) {
		... TimeSpanFragment
	}
}
fragment TimeSpanFragment on TimeSpan {
	id
	createdAt
	updatedAt
	start
	end
	note
	running
	tags {
		... TagFragment
	}
}
fragment TagFragment on Tag {
	id
	createdAt
	updatedAt
	name
}
`,
		Variables: &__updateTimeSpanInput{
			Id:    id,
			Input: input,
		},
	}
	var err error

	var data updateTimeSpanResponse
	resp := &graphql.Response{Data: &data}

	err = client.MakeRequest(
		ctx,
		req,
		resp,
	)

	return &data, err
}

func version(
	ctx context.Context,
	client graphql.Client,
) (*versionResponse, error) {
	req := &graphql.Request{
		OpName: "version",
		Query: `
query version {
	version
}
`,
	}
	var err error

	var data versionResponse
	resp := &graphql.Response{Data: &data}

	err = client.MakeRequest(
		ctx,
		req,
		resp,
	)

	return &data, err
}
