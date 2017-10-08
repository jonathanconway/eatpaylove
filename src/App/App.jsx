import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const borderRadius = 0.3
const primaryColour = '#000000'
const secondaryColour = '#e6d766'
const tertiaryColor = '#d9d5be'

const Body = styled.div`
  margin: 0;
  padding: 0;`

const stackedContainer = `
  position: fixed;
  width: 96%;`

const button = `
  background-color: white;
  border-radius: ${borderRadius}rem;
  border-bottom-width: 0.25rem;
  border-right-width: 0.25rem;
  background-image: -webkit-linear-gradient(-60deg, #efefef 50%, #e2e2e2 50%);
  font-size: 2rem;`

const TitleBar = styled.div`
  ${stackedContainer}`

  const Title = styled.h1`
    margin: 0;
    padding: 0;
    display: inline-block;
    font-size: 2.5rem;`

  const SubTitle = styled.h2`
    width: 3rem;
    display: inline-block;
    margin: 0 0.5rem;
    text-align: center;
    height: 3.2rem;
    font-family: 'Roboto Mono';
    line-height: 1.3rem;

    > span {    
      width: 100%;
      display: inline-block;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }`

  const MonthDay = styled.span`
    font-size: 0.8rem;`

  const Year = styled.span`
    font-size: 1rem;`

  const TitleBarButtonContainer = styled.div`
    float: right;`

  const BackForwardButton = styled.button`
    ${button}
    display: inline-block;
    vertical-align: top;
    text-align: center;
    width: 4rem;

    @media only screen and (max-device-width: 480px) {
      width: 2rem;
      text-indent: -1rem;
    }`

const TodaysExpensesContainer = styled.div`
  ${stackedContainer}
  overflow-y: auto;
  top: 4rem;
  height: 10rem;
  margin: 0.3rem 0.1rem 0.1rem 0.1rem;
  box-sizing: border-box;
  border-radius: ${borderRadius}rem;
  border: solid 1px ${tertiaryColor};
  background-color: #f9f7e9;`

const allCapsHeading = `
  font-size: 0.8rem;
  text-transform: uppercase;`

const TodaysExpenses = styled.table.attrs({
    cellSpacing: "0",
    cellPadding: "5"
  })``

  const TodaysExpensesRow = styled.tr``

  const TodaysExpensesHeaderCell = styled.th`
    ${allCapsHeading}
    text-align: left;
  `

  const TodaysExpensesItemCell = styled.td`
    width: 30%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 8rem;
    padding-right: 0.5rem;`

  const TodaysExpensesCostCell = styled.td`
    width: 30%;`

  const TodaysExpensesCaloriesCell = styled.td`
    width: 30%;`

  const TodaysExpensesActionsCell = styled.td`
    width: 10%;`

  const TodaysExpensesButton = styled.button`
    ${button}
    display: inline-block;
    height: 1.8rem;
    font-size: 0.8rem;`

  const TodaysExpensesFooter = styled.tfoot`
    font-weight: bold;`

    const costColour = `#f3881e`
    const caloriesColour = `#e34569`

    const TodaysExpensesFooterOtherCell = styled.td`
      background-color: #c5c1ab;`
    
    const TodaysExpensesFooterCostCell = styled.td`
      color: white;
      background-color: ${costColour};`

    const TodaysExpensesFooterCaloriesCell  = styled.td`
      color: white;
      background-color: ${caloriesColour};`

const NewExpense = styled.form`
  ${stackedContainer}
  height: 3rem;
  margin: 0;
  box-sizing: border-box;
  top: 15rem;`

  const expenseElement = `
    display: inline-block;
    box-sizing: border-box;
    height: 100%;
    font-size: 1.5rem;
    vertical-align: top;`

  const inputElement = `
    ${expenseElement}
    appearance: none;
    border-radius: ${borderRadius}rem;
    border: solid 1px silver;
    padding: 0 0 0 0.5rem;`

  const expenseButton = `
    ${expenseElement}
    ${button}
    width: 4rem;
    height: 2.9rem;`

  const NameInput = styled.input`
    ${inputElement}
    width: 42%;`

  const CostInput = styled.input`
    ${inputElement}
    width: 18%;`

  const CaloriesInput = styled.input`
    ${inputElement}
    width: 18%;`

  const AddExpenseButton = styled.button`
    ${expenseButton}
    padding: 0;
    float: right;
    position: relative;
    text-align: center;
    color: transparent;

    &:after {
      content: '+';
      position: absolute;
      margin: auto;
      color: black;
      top: 0;
      left: 0;
      width: 100%;
    }`

const Panel = styled.div`
  ${stackedContainer}
  top: 20.5rem;
  height: 12rem;
  overflow: scroll;
  border-radius: ${borderRadius}rem;
  border: solid 1px ${tertiaryColor};
  padding: 0 0 0 0.5rem;
  box-sizing: border-box;`

  const PanelHeading = styled.h2`
    ${allCapsHeading}
    color: gray`

  const Recent = styled.div`
    display: inline-block;
    
    border: solid 1px silver;
    border-radius: ${borderRadius}rem;
    margin: 0 0.9rem 1rem 0;
    width: 45%;
    
    > * {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0.2rem;
      display: inline-block;
    }`

    const RecentItem = styled.span`
      width: 50%;
    `
    const RecentCost = styled.span`
      width: 25%;
      color: ${costColour};
    `
    const RecentCalories = styled.span`
      width: 25%;
      color: ${caloriesColour};
    `

const Footer = styled.footer`
  ${stackedContainer}
  bottom: 0rem;
  height: 2rem;
  text-align: center;

  &, a {
    color: ${tertiaryColor};
  }`

  const CopyrightSymbol = styled.span`
    transform: scale(-1, 1);`

export default class App extends React.Component {
  static propTypes = {
    selectedDate: PropTypes.object,
    getBulletFormattedDate: PropTypes.func,
    newExpense: PropTypes.object,
    getSelectedYear: PropTypes.func,
    todaysItems: PropTypes.func,
    totalOfColumn: PropTypes.func,
    recentUniqueExpenses: PropTypes.func,
    onGoBackOneDay: PropTypes.func,
    onGoForwardOneDay: PropTypes.func,
    onDeleteExpense: PropTypes.func,
    onChangeFieldValue: PropTypes.func,
  }

  static defaultProps = {
    selectedDate: new Date(),
    getBulletFormattedDate: () => null,
    newExpense: {},
    getSelectedYear: () => null,
    todaysItems: () => null,
    totalOfColumn: () => null,
    recentUniqueExpenses: () => null,
    onGoBackOneDay: () => null,
    onGoForwardOneDay: () => null,
    onDeleteExpense: () => null,
    onChangeFieldValue: () => null
  }

  scrollTodaysExpensesContainerToBottom = () => 
    this.TodaysExpensesContainer.scrollTop = 1000000

  componentDidMount() {
    this.scrollTodaysExpensesContainerToBottom()
  }

  onAddExpense = () => {
    this.props.onAddExpense()
    setTimeout(this.scrollTodaysExpensesContainerToBottom)
  }

  onPopulateRecentExpense = recent => () => {
    this.props.onPopulateRecentExpense(recent)()
    setTimeout(this.scrollTodaysExpensesContainerToBottom)
  }

  render = () => {
    const {
      selectedDate,
      getBulletFormattedDate,
      newExpense,

      getSelectedYear,
      todaysItems,
      totalOfColumn,
      recentUniqueExpenses,

      onGoBackOneDay,
      onGoForwardOneDay,
      onDeleteExpense,
      onChangeFieldValue
    } = this.props

    return <Body data-test="app">
      <TitleBar>
        <Title>👄 💵 💛</Title>

        <TitleBarButtonContainer>
          <BackForwardButton type="button" onTouchStart={onGoBackOneDay}>←</BackForwardButton>
          <SubTitle>
            <MonthDay>
              {getBulletFormattedDate(selectedDate)}
            </MonthDay>
            <Year>{getSelectedYear(selectedDate)}</Year>
          </SubTitle>
          <BackForwardButton type="button" onTouchStart={onGoForwardOneDay}>→</BackForwardButton>
        </TitleBarButtonContainer>
      </TitleBar>

      <TodaysExpensesContainer innerRef={element => this.TodaysExpensesContainer = element}>
        <TodaysExpenses>
          <thead>
            <tr>
              <TodaysExpensesHeaderCell />
              <TodaysExpensesHeaderCell>Cost</TodaysExpensesHeaderCell>
              <TodaysExpensesHeaderCell>Calories</TodaysExpensesHeaderCell>
            </tr>
          </thead>
          <tbody>
            {todaysItems().map((item, index) =>
              <TodaysExpensesRow key={index}>
                <TodaysExpensesItemCell key={`TodaysExpensesItemCell${index}`}>{item.item}</TodaysExpensesItemCell>
                <TodaysExpensesCostCell key={`TodaysExpensesCostCell${index}`}>${item.cost}</TodaysExpensesCostCell>
                <TodaysExpensesCaloriesCell key={`TodaysExpensesCaloriesCell${index}`}>{item.calories}</TodaysExpensesCaloriesCell>
                <TodaysExpensesActionsCell>
                  <TodaysExpensesButton
                    type="button"
                    onTouchStart={onDeleteExpense(index)}>Delete</TodaysExpensesButton>
                </TodaysExpensesActionsCell>
              </TodaysExpensesRow>
            )}
          </tbody>
          {todaysItems().length > 0 &&
            <TodaysExpensesFooter>
              <TodaysExpensesRow>
                <TodaysExpensesFooterOtherCell>Total</TodaysExpensesFooterOtherCell>
                <TodaysExpensesFooterCostCell>${totalOfColumn(todaysItems(), 'cost')}</TodaysExpensesFooterCostCell>
                <TodaysExpensesFooterCaloriesCell>{totalOfColumn(todaysItems(), 'calories')}</TodaysExpensesFooterCaloriesCell>
                <TodaysExpensesFooterOtherCell></TodaysExpensesFooterOtherCell>
              </TodaysExpensesRow>
            </TodaysExpensesFooter>}
        </TodaysExpenses>
      </TodaysExpensesContainer>

      <NewExpense novalidate>
        <NameInput
          type="text"
          autocomplete="off" 
          placeholder="Item"
          required="required"
          value={newExpense.item}
          onChange={onChangeFieldValue('item')}
        />
        <CostInput
          type="number"
          maxlength={5}
          placeholder="Cost"
          value={newExpense.cost}
          onChange={onChangeFieldValue('cost')}
        />
        <CaloriesInput
          type="number"
          placeholder="Cal"
          value={newExpense.calories}
          onChange={onChangeFieldValue('calories')}
        />
        <AddExpenseButton
          type="button"
          onTouchStart={this.onAddExpense}>Add Expense</AddExpenseButton>
      </NewExpense>

      <Panel>
        <PanelHeading>Recent Entries</PanelHeading>

        {recentUniqueExpenses().map((recent, index) =>
          <Recent key={'recent' + recent.item + index} onTouchStart={this.onPopulateRecentExpense(recent)}>
            <RecentItem>{recent.item}</RecentItem>
            <RecentCost>${recent.cost}</RecentCost>
            <RecentCalories>{recent.calories}</RecentCalories>
          </Recent>
        )}
      </Panel>

      <Footer>
        <CopyrightSymbol>&copy;</CopyrightSymbol> 2017 • a <a href="http://conwy.co">CONW_Y</a> experiment
      </Footer>
    </Body>
  }
}