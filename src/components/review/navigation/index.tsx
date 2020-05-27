import * as React from "react"
import cx from "classnames"
import { Moment } from "moment"
import Link from "next/link"

import { Avatar, Error } from "polyvolve-ui/lib"

import * as style from "../style.scss"
import * as globalStyle from "../../../style/style.scss"
import { HomeIcon } from "polyvolve-ui/lib/icons"
import {
  User,
  ReviewUserValueContainer,
} from "polyvolve-ui/lib/@types"

interface Props {
  user?: User
  reviewUser?: ReviewUserValueContainer
  users: User[]
  idx: number
  hash?: string
  showErrors: boolean
  updateUser: (idx: number) => void
}

interface State {
  showExtendedUserInfo: boolean
  pinExtendedUserInfo: boolean
}

export default class ReviewNavigation extends React.Component<Props, State> {
  state = {
    showExtendedUserInfo: false,
    pinExtendedUserInfo: false,
  }

  pin = () => {
    this.setState({ pinExtendedUserInfo: true })
  }

  unpin = () => {
    this.setState({ pinExtendedUserInfo: false })
  }

  onMouseEnter = () => {
    //this.setState({ showExtendedUserInfo: true })
  }

  onMouseLeave = () => {
    //this.setState({ showExtendedUserInfo: false })
  }

  render(): JSX.Element {
    const { user, reviewUser, hash, showErrors } = this.props

    const { showExtendedUserInfo, pinExtendedUserInfo } = this.state

    const warn = !reviewUser || !reviewUser.markedCompleted
    const gradientStyle = "" // `linear-gradient(to bottom, rgba(${user.color.r},${user.color.g}, ${user.color.b}, 0.25) 0%,rgba(0,0,0,0) 100%)`
    const classes = cx(style.reviewNavigationContainer, {
      [style.notExpanded]: !showExtendedUserInfo && !pinExtendedUserInfo,
    })
    const expansionClasses = cx(style.reviewNavigationExpansionContainer, {
      [style.expanded]: showExtendedUserInfo || pinExtendedUserInfo,
    })

    return (
      <React.Fragment>
        <div className={classes} onMouseEnter={this.onMouseEnter}>
          <div style={{ background: gradientStyle }}>
            <div className={style.reviewNavigation}>
              {!user && showErrors && (
                <React.Fragment>
                  <span />
                  <Error className={style.navigationError}>
                    Unable to find a user to review.
                  </Error>
                </React.Fragment>
              )}
              <Link href={`/?id=${hash}`}>
                <HomeIcon size={{ width: 16, height: 16 }} title={"HOMEICON"} />
              </Link>
              <div className={style.reviewNavigationUserInfo}>
                <p>
                  <strong>Reviewing</strong>
                </p>
                {!user && <p>...</p>}
                {user && (
                  <React.Fragment>
                    <Avatar
                      url={user.avatar}
                      size={24}
                      className={style.miniAvatar}
                      name={user.surname}
                    />
                    <p>{user.name + " " + user.surname}</p>
                    <p>{user.position}</p>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
        {!pinExtendedUserInfo && (
          <div className={style.pinArrow} onClick={this.pin}></div>
        )}
        <div className={expansionClasses} onMouseLeave={this.onMouseLeave}>
          <div className={style.reviewNavigationExpansion}>
            <div className={style.content}>
              <div className={style.userDueAtList}>
                <React.Fragment>
                  {(!reviewUser || !reviewUser.markedCompleted) && warn && (
                    <p className={globalStyle.short}>Not completed</p>
                  )}
                  {reviewUser && reviewUser.markedCompleted && (
                    <p className={globalStyle.long}>Completed</p>
                  )}
                </React.Fragment>
              </div>
              <div className={style.pinButton}>
                {pinExtendedUserInfo && <a onClick={this.unpin}>Minimize</a>}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
