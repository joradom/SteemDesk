import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import { gridSize } from '@atlaskit/theme'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import Banner from '@atlaskit/banner'
import Spinner from '@atlaskit/spinner'
import { steemSelectors } from '../state/steem'
import { cryptoSelectors } from '../state/crypto'
import PageHeaderWithUserInput from '../components/PageHeaderWithUserInput'
import ContentWrapper from '../components/ContentWrapper'
import Level from '../components/Level'
import LevelItem from '../components/LevelItem'
import Heading from '../components/Heading'
import Title from '../components/Title'
import styled from 'styled-components'

const Padding = styled.div`
  margin-top: ${gridSize() * 4}px;
  margin-bottom: ${gridSize() * 4}px;
  padding-bottom: ${gridSize() * 3}px;
`

class Dashboard extends Component {
  static propTypes = {
    errorMessage: PropTypes.string
  }

  render () {
    const Icon = <ErrorIcon label='Error icon' secondaryColor='inherit' />

    return (
      <ContentWrapper>
        <Page>
          { // Show error banner only when there is an error set
            (this.props.errorMessage !== '')
              ? <Banner icon={Icon} isOpen appearance='error'>{this.props.errorMessage}</Banner>
              : null
          }
          <PageHeaderWithUserInput title='Dashboard' />
          <Grid layout='fluid'>
            <GridColumn medium={6}>
              <Padding>
                <Level>
                  <LevelItem>
                    <Heading>Steem</Heading>
                    { // Show spinner when price history is loading
                      (this.props.priceHistoryStatus === 'LOADING')
                        ? <Spinner size='small' />
                        : <Title>{this.props.steemPrice}</Title>
                    }
                  </LevelItem>
                </Level>
              </Padding>
            </GridColumn>
            <GridColumn medium={6}>
              <Padding>
                <Level>
                  <LevelItem>
                    <Heading>SBD</Heading>
                    { // Show spinner when price history is loading
                      (this.props.priceHistoryStatus === 'LOADING')
                        ? <Spinner size='small' />
                        : <Title>{this.props.sbdPrice}</Title>
                    }
                  </LevelItem>
                </Level>
              </Padding>
            </GridColumn>
            <GridColumn medium={4}>
              <Padding>
                <Level>
                  <LevelItem>
                    <Heading>Reputation</Heading>
                    <Title>{this.props.reputation}</Title>
                  </LevelItem>
                </Level>
              </Padding>
            </GridColumn>
            <GridColumn medium={4}>
              <Padding>
                <Level>
                  <LevelItem>
                    <Heading>Followers</Heading>
                    <Title>{this.props.followCount.follower_count}</Title>
                  </LevelItem>
                </Level>
              </Padding>
            </GridColumn>
            <GridColumn medium={4}>
              <Padding>
                <Level>
                  <LevelItem>
                    <Heading>Following</Heading>
                    <Title>{this.props.followCount.following_count}</Title>
                  </LevelItem>
                </Level>
              </Padding>
            </GridColumn>
          </Grid>
        </Page>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const steemPrice = cryptoSelectors.selectSteemPrice(state)
  const sbdPrice = cryptoSelectors.selectSBDPrice(state)
  const priceHistoryStatus = cryptoSelectors.selectPriceHistoryStatus(state)
  const reputation = steemSelectors.selectReputation(state)
  const followCount = steemSelectors.selectFollowCount(state)
  const errorMessage = steemSelectors.selectErrorMessage(state)

  return { steemPrice, sbdPrice, priceHistoryStatus, reputation, followCount, errorMessage }
}

export default connect(mapStateToProps)(Dashboard)
