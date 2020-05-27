import * as React from "react"
import Link from "next/link"

import { Avatar, Button } from "polyvolve-ui/lib"

import * as style from "./style.scss"
import * as globalStyle from "../../style/style.scss"
import { ReviewUserValueContainer } from "polyvolve-ui/lib/@types"

interface Props {
  reviewUsers: ReviewUserValueContainer[]
  hash: string
}

const UsersForReviewList: React.FC<Props> = props => {
  const { reviewUsers, hash } = props

  let usersBase: ReviewUserValueContainer[] = reviewUsers.filter(
    reviewUser => !reviewUser.markedCompleted
  )

  if (usersBase.length > 3) {
    usersBase = usersBase.slice(0, 3)
  }

  return (
    <React.Fragment>
      <h3 className={style.usersTitle}>Users for review</h3>
      <div className={style.usersView}>
        {usersBase.map(reviewUser => (
          <UserItem
            key={"item-" + reviewUser.reviewedUser.id}
            hash={hash}
            reviewUser={reviewUser}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

interface ItemProps {
  reviewUser: ReviewUserValueContainer
  hash: string
}

const UserItem: React.FunctionComponent<ItemProps> = props => {
  const { reviewUser, hash } = props

  const { reviewedUser } = reviewUser

  const gradientStyle = "" //`linear-gradient(to bottom, rgba(${user.color.r},${user.color.g}, ${user.color.b}, 0.15) 0%,rgba(0,0,0,0) 100%)`

  return (
    <div className={style.usersItem}>
      <div
        className={style.usersItemInner}
        style={{ background: gradientStyle }}>
        <Avatar
          url={reviewedUser.avatar}
          size={64}
          className={style.usersAvatar}
          name={reviewedUser.surname}
        />
        <div className={style.usersName}>
          <a>{reviewedUser.name + " " + reviewedUser.surname}</a>
        </div>
        <div className={style.userPosition}>
          <p>{reviewedUser.position}</p>
        </div>
        <div className={style.userBottom}>
          <Link
            href={{
              pathname: "/review",
              query: { id: hash, userId: reviewedUser.id },
            }}>
            <a>
              <Button className={style.reviewButton} name="Review">
                Review
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UsersForReviewList
